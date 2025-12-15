function withValidProperties(properties: Record<string, undefined | string | string[]>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
  );
}

export async function GET() {
return Response.json({
    "accountAssociation": {
      "header": "eyJmaWQiOjE1MzUwNjYsInR5cGUiOiJhdXRoIiwia2V5IjoiMHg5OWJGMDYyRjdFNTRBOWM2MEYwMjc1MmVmQjQ4MTIyNTQ0ZDg3ZmI2In0",
      "signature": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAASAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB_ZpKUoMHQW9opwnCuj6f5OFeaSeJIc225NHfB2Tf4r84V03EhNbs_ciI89RPk4ZIHboZjQs2yby84ZKs3V1zoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAl8ZgIay2xclZzG8RWZzuWvO8j9R0fus3XxDee9lRlVy8dAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACKeyJ0eXBlIjoid2ViYXV0aG4uZ2V0IiwiY2hhbGxlbmdlIjoiMHJGWVl0TTEyVThDZ2ZtbFhVOUZtNkRwcUtMYm5UdzdpamVjdWJnNnRSdyIsIm9yaWdpbiI6Imh0dHBzOi8va2V5cy5jb2luYmFzZS5jb20iLCJjcm9zc09yaWdpbiI6ZmFsc2V9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
      "payload": "eyJkb21haW4iOiJqZXNzZS10aGUtb3JhY2xlLnZlcmNlbC5hcHAifQ"
    },
    "miniapp": {
      "version": "1",
      "name": "Jesse the Oracle",
      "homeUrl": "https://jesse-the-oracle.vercel.app",
      "iconUrl": "https://jesse-the-oracle.vercel.app/oraclee.png",
      "splashImageUrl": "https://jesse-the-oracle.vercel.app/oraclee.png",
      "splashBackgroundColor": "#000000",
      "webhookUrl": "https://ex.co/api/webhook",
      "subtitle": "Fast, fun, social",
      "description": "A fast, fun way to challenge friends in real time.",
      "screenshotUrls": [
        "https://jesse-the-oracle.vercel.app/oraclee.png",
        "https://jesse-the-oracle.vercel.app/oraclee.png",
        "https://jesse-the-oracle.vercel.app/oraclee.png"
      ],
      "primaryCategory": "social",
      "tags": ["example", "miniapp", "baseapp"],
      "heroImageUrl": "https://jesse-the-oracle.vercel.app/oraclee.png",
      "tagline": "Play instantly",
      "ogTitle": "Fun Predicts",
      "ogDescription": "Challenge friends in real time.",
      "ogImageUrl": "https://jesse-the-oracle.vercel.app/oraclee.png",
      "noindex": true
    }
  }); // see the next step for the manifest_json_object
}

