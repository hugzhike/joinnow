import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          gap: 24,
          padding: 96,
          background: "linear-gradient(135deg, #fbf9f6 0%, #ffe3d6 55%, #ff9e74 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "linear-gradient(135deg, #ff7a4d, #f0401b)",
            }}
          />
          <div style={{ display: "flex", fontSize: 56, fontWeight: 800, color: "#0b0e1f" }}>
            Join<span style={{ color: "#ff5a36" }}>Now</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 800,
            color: "#0b0e1f",
            lineHeight: 1.15,
            maxWidth: 900,
          }}
        >
          Ne fais plus jamais une activité seul.
        </div>
        <div style={{ display: "flex", fontSize: 32, color: "#4a5580", fontWeight: 600 }}>
          Bientôt à Nice · Alpes-Maritimes
        </div>
      </div>
    ),
    { ...size }
  );
}
