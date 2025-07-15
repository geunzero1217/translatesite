const API_KEY = "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"; // 절대로 공개 저장소에 올리면 안 됩니다!

async function translateToKorean(englishText) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        { role: "system", content: "Translate English to Korean." },
        { role: "user", content: englishText }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

function startTranslation() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'en-US';
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onresult = async (event) => {
    const englishText = event.results[event.results.length - 1][0].transcript;
    console.log("🎧 인식된 영어:", englishText);

    const koreanText = await translateToKorean(englishText);
    document.getElementById("subtitle").innerText = koreanText;
  };

  recognition.onerror = (event) => {
    console.error("음성 인식 오류:", event.error);
  };

  recognition.start();
}