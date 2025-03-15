import { createCanvas, loadImage, CanvasRenderingContext2D } from "canvas";
import sharp from "sharp";

const THUMBNAIL_WIDTH = 1200;
const THUMBNAIL_HEIGHT = 700;

export async function createThumbnail(
  userId: string,
  bgImageUrl: string,
  profileImageUrl: string,
  fullName: string,
  from: string,
  bio: string,
  age: string,
  profession: string,
  study: string,
  username: string
): Promise<Buffer | null> {
  try {
    const bgImageBuffer = await loadImageFromUrl(bgImageUrl);
    const profileImageBuffer = await loadImageFromUrl(profileImageUrl);

    if (!bgImageBuffer || !profileImageBuffer) {
      throw new Error("Failed to load images");
    }

    // Blur the background image
    const blurredBg = await sharp(bgImageBuffer)
      .resize(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT)
      .blur(3)
      .toBuffer();

    // Create canvas
    const canvas = createCanvas(THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) throw new Error("Failed to get canvas context");

    // Draw blurred background
    const bgImage = await loadImage(blurredBg);
    ctx.drawImage(bgImage, 0, 0, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);

    // Dark overlay
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, THUMBNAIL_WIDTH, THUMBNAIL_HEIGHT);

    const profileSize = 250;
    const profileX = 50;
    const profileY = 50;

    const profileImage = await loadImage(profileImageBuffer);

    ctx.save();
    ctx.beginPath();

    const cornerRadius = 40;
    ctx.roundRect(profileX, profileY, profileSize, profileSize, cornerRadius);

    ctx.closePath();
    ctx.clip();

    ctx.drawImage(profileImage, profileX, profileY, profileSize, profileSize);
    ctx.restore();

    // User ID Box
    const canvasHeight = ctx.canvas.height;
    const boxX = 25;
    const boxY = canvasHeight - 120;
    const boxWidth = 280;
    const boxHeight = 90;

    drawRoundedRect(ctx, boxX, boxY, boxWidth, boxHeight, 22, "rgba(0, 0, 0, 0.2)");

    // Text Styles
    ctx.font = "bold 24px Arial";
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#333333";
    ctx.lineWidth = 2;

    const idText = `ID: ${userId}`;
    const idTextWidth = ctx.measureText(idText).width;
    const idTextX = boxX + boxWidth / 2 - idTextWidth / 2;
    const idTextY = boxY + 35;

    const usernameText = `Username: ${username}`;
    const usernameTextWidth = ctx.measureText(usernameText).width;
    const usernameTextX = boxX + boxWidth / 2 - usernameTextWidth / 2;
    const usernameTextY = idTextY + 30;

    // Draw Texts
    ctx.strokeText(idText, idTextX, idTextY);
    ctx.fillText(idText, idTextX, idTextY);
    ctx.strokeText(usernameText, usernameTextX, usernameTextY);
    ctx.fillText(usernameText, usernameTextX, usernameTextY);

    // User Details Box
    const canvasWidth = ctx.canvas.width;
    const detailsBoxWidth = 700;
    const detailsBoxHeight = 400;
    const margin = 60;
    const detailsX = canvasWidth - detailsBoxWidth - margin;
    const detailsY = canvasHeight - detailsBoxHeight - margin;
    drawRoundedRect(
      ctx,
      detailsX - 25,
      detailsY - 25,
      detailsBoxWidth,
      detailsBoxHeight,
      35,
      "rgba(0, 0, 0, 0.4)"
    );
    ctx.strokeStyle = "rgba(211, 211, 211, 0.4)";
    ctx.lineWidth = 2;
    drawRoundedRect(
      ctx,
      detailsX - 25,
      detailsY - 25,
      detailsBoxWidth,
      detailsBoxHeight,
      35,
      "transparent"
    );

    // Full Name
    // ctx.font = "bold 36px 'Lucida Console', monospace";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "green";
    ctx.lineWidth = 4;
    ctx.strokeText(`Intro For: ${fullName}`, detailsX, detailsY + 40);
    ctx.fillText(`Intro For: ${fullName}`, detailsX, detailsY + 40);

    // Other Details
    ctx.font = "bold 26px Verdana";
    ctx.fillStyle = "#ffffff";
    ctx.fillText(`From: ${from}`, detailsX, detailsY + 90);
    ctx.fillText(`Age: ${age}`, detailsX, detailsY + 125);
    ctx.fillText(`Profession: ${profession}`, detailsX, detailsY + 160);
    ctx.fillText(`Study: ${study}`, detailsX, detailsY + 195);

    // Wrap bio text inside the box
    wrapText(ctx, bio, detailsX, detailsY + 235, 500, 28, 180);

    // Bot Name
    ctx.font = "bold 30px 'Courier New'";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.textAlign = "right";
    ctx.strokeText("@my_intro_bot", THUMBNAIL_WIDTH - 50, 70);
    ctx.fillText("@my_intro_bot", THUMBNAIL_WIDTH - 50, 70);

    return canvas.toBuffer("image/jpeg");
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}

// Helper function to load image from URL
async function loadImageFromUrl(url: string): Promise<Buffer | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch image: ${url}`);
    return Buffer.from(await response.arrayBuffer());
  } catch (err) {
    console.error("Error loading image:", err);
    return null;
  }
}

// Draw Rounded Rectangle
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fillColor: string
): void {
  ctx.fillStyle = fillColor;
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.arcTo(x + width, y, x + width, y + radius, radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius);
  ctx.lineTo(x + radius, y + height);
  ctx.arcTo(x, y + height, x, y + height - radius, radius);
  ctx.lineTo(x, y + radius);
  ctx.arcTo(x, y, x + radius, y, radius);
  ctx.closePath();
  ctx.fill();
}

// Wrap Text
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number
): void {
  const words = text.split(" ");
  const firstLinePrefix = "Bio: ";
  let line = "";
  let lines = 0;

  for (let i = 0; i < words.length; i++) {
    const testLine = (lines === 0 ? firstLinePrefix : "") + line + words[i] + " ";
    const testWidth = ctx.measureText(testLine.trim()).width;

    if (testWidth > maxWidth && line !== "") {
      ctx.fillText((lines === 0 ? firstLinePrefix : " ".repeat(6)) + line.trim(), x, y);
      line = words[i] + " ";
      y += lineHeight;
      lines++;

      if (lines >= maxLines - 1) {
        ctx.fillText(" ".repeat(6) + line.trim() + "...", x, y);
        return;
      }
    } else {
      line = testLine.replace(/^Bio: /, "");
    }
  }

  if (line.trim() !== "" && lines < maxLines) {
    ctx.fillText((lines === 0 ? firstLinePrefix : " ".repeat(6)) + line.trim(), x, y);
  }
}
