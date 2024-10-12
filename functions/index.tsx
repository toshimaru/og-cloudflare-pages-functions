import React from "react";
import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";
import { type PagesFunction } from "@cloudflare/workers-types";
import { fetchFont } from "./utils";

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const title = url.searchParams.get("title") ?? "OGP SAMPLE";
  const avatar = url.searchParams.get("avatar");
  const fontData = await fetchFont({
    text: title,
    family: "Noto+Sans+JP",
    weight: 700,
  });

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#F4F4FA",
          width: 1200,
          height: 630,
          backgroundImage: 'url("https://raw.githubusercontent.com/toshimaru/og-cloudflare-pages-functions/refs/heads/main/images/ogp-background.png")',
        }}
      >
        {avatar && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 600,
            }}
          >
            <img
              src={avatar}
              width={200}
              height={200}
              style={{
                borderRadius: "50%",
              }}
            />
          </div>
        )}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: 600,
            fontSize: 48,
          }}
        >
          {title}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontData,
          weight: 700,
          style: "bold",
        },
      ],
    }
  );
};
