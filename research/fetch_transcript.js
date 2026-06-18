const fs = require('fs');
const path = require('path');

const API_KEY = 'sd_55c5224ebab227f6d36c31ebe7cb8eaf'; 
const VIDEO_ID = 'i-YDUfx84f8'; 
const AUTHOR_NAME = 'Pierre_Herubel';

async function getTranscript() {
  const url = `https://api.supadata.ai/v1/youtube/transcript?videoId=${VIDEO_ID}`;
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
      }
    });
    
    const data = await response.json();
    
    if (data.text) {
      const outputPath = path.join(__dirname, 'research', 'youtube-transcripts', `${AUTHOR_NAME}_transcript.txt`);
      fs.writeFileSync(outputPath, data.text);
      console.log(`Success! Transcript saved to ${outputPath}`);
    } else {
      console.error('Error fetching transcript:', data);
    }
  } catch (error) {
    console.error('API Request failed:', error);
  }
}

getTranscript();