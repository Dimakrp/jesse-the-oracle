function withValidProperties(properties: Record<string, undefined | string | string[]>) {
  return Object.fromEntries(
    Object.entries(properties).filter(([_, value]) => (Array.isArray(value) ? value.length > 0 : !!value))
  );
}

export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL as string;
  return Response.json({
    "accountAssociation": {  // these will be added in step 5
      "header": "",
      "payload": "",
      "signature": ""
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

