import { ImageResponse } from "next/og";

import { markDataUri } from "@/lib/og-mark";

export const alt = "Local Impact Doorstep: Put your business on 1,000 local doorsteps";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0F2D5B",
          padding: "64px 72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          { }
          <img src={markDataUri(true)} width={92} height={92} alt="" />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <span style={{ fontSize: 40, fontWeight: 800 }}>Local Impact</span>
            <span style={{ fontSize: 46, fontWeight: 800, color: "#F97316" }}>Doorstep</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>Put Your Business on</span>
          <span style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05, color: "#F97316" }}>1,000 Local Doorsteps</span>
          <span style={{ fontSize: 32, marginTop: 24, color: "#D9E3F2" }}>
            We design, print, and personally distribute neighborhood door hanger campaigns.
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#B3C6E4" }}>
          <span>Your business. On local doorsteps.</span>
          <span style={{ color: "#F97316", fontWeight: 700 }}>500 homes $449 · 1,000 homes $699</span>
        </div>
      </div>
    ),
    size,
  );
}
