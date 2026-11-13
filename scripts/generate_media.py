import os
import subprocess
import urllib.request
import math
import wave
import struct
import random

WORKSPACE = r"c:\wamp64\www\100 projets special formation Jonathan TIANDO\projet  1 - Copie (7)"
ARTIFACT_DIR = r"C:\Users\USER\.gemini\antigravity\brain\5ca32334-e6ca-4407-ac71-585cac6c655d"
FFMPEG = r"C:\ffmpeg\bin\ffmpeg.exe"

os.makedirs(os.path.join(WORKSPACE, "public", "images", "hero"), exist_ok=True)
os.makedirs(os.path.join(WORKSPACE, "public", "images", "interior"), exist_ok=True)
os.makedirs(os.path.join(WORKSPACE, "public", "images", "dishes"), exist_ok=True)
os.makedirs(os.path.join(WORKSPACE, "public", "videos"), exist_ok=True)
os.makedirs(os.path.join(WORKSPACE, "public", "audio"), exist_ok=True)

# 1. Direct AI-generated source files
direct_mappings = {
    os.path.join(ARTIFACT_DIR, "hero_main_png_1794239188410.jpg"): os.path.join(WORKSPACE, "public", "images", "hero", "hero-main.webp"),
    os.path.join(ARTIFACT_DIR, "hero_flambe_png_1794239208355.jpg"): os.path.join(WORKSPACE, "public", "images", "hero", "hero-flambe.webp"),
    os.path.join(ARTIFACT_DIR, "interior_main_png_1794239227778.jpg"): os.path.join(WORKSPACE, "public", "images", "interior", "interior-main.webp"),
    os.path.join(ARTIFACT_DIR, "terrace_evening_png_1794239278008.jpg"): os.path.join(WORKSPACE, "public", "images", "interior", "terrace-evening.webp"),
    os.path.join(ARTIFACT_DIR, "carpaccio_st_jacques_1794239188408.jpg"): os.path.join(WORKSPACE, "public", "images", "dishes", "carpaccio-st-jacques.webp"),
    os.path.join(ARTIFACT_DIR, "burger_signature_1794239210260.jpg"): os.path.join(WORKSPACE, "public", "images", "dishes", "burger-signature.webp"),
    os.path.join(ARTIFACT_DIR, "cote_de_boeuf_1794239237473.jpg"): os.path.join(WORKSPACE, "public", "images", "dishes", "cote-de-boeuf.webp"),
    os.path.join(ARTIFACT_DIR, "bar_sauvage_png_1794239192413.jpg"): os.path.join(WORKSPACE, "public", "images", "dishes", "bar-sauvage.webp"),
    os.path.join(ARTIFACT_DIR, "gambas_braisees_png_1794239211028.jpg"): os.path.join(WORKSPACE, "public", "images", "dishes", "gambas-braisees.webp"),
    os.path.join(ARTIFACT_DIR, "elixir_botanique_png_1794239231765.jpg"): os.path.join(WORKSPACE, "public", "images", "dishes", "elixir-botanique.webp"),
}

for src, dst in direct_mappings.items():
    if os.path.exists(src):
        subprocess.run([
            FFMPEG, "-y", "-i", src,
            "-vf", "scale=1600:-2",
            "-c:v", "libwebp", "-quality", "86",
            dst
        ], check=True)
        print(f"Converted {os.path.basename(dst)}")

# 2. For the remaining 6 dishes + 1 kitchen plating image, try fetching curated high-res Unsplash gastronomy photos first;
#    if any download fails, create distinct macro/color-graded culinary compositions using FFmpeg filters from our high-res AI assets.
extra_assets = [
    {
        "dst": os.path.join(WORKSPACE, "public", "images", "interior", "kitchen-plating.webp"),
        "url": "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1400&q=85",
        "fallback_src": os.path.join(ARTIFACT_DIR, "hero_flambe_png_1794239208355.jpg"),
        "fallback_vf": "crop=iw*0.8:ih*0.8:iw*0.1:ih*0.1,eq=contrast=1.06:saturation=1.1,scale=1400:-2"
    },
    {
        "dst": os.path.join(WORKSPACE, "public", "images", "dishes", "veloute-courge.webp"),
        "url": "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1400&q=85",
        "fallback_src": os.path.join(ARTIFACT_DIR, "carpaccio_st_jacques_1794239188408.jpg"),
        "fallback_vf": "crop=iw*0.82:ih*0.82:iw*0.09:ih*0.09,hue=h=-12:s=1.15,scale=1400:-2"
    },
    {
        "dst": os.path.join(WORKSPACE, "public", "images", "dishes", "filet-rossini.webp"),
        "url": "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=85",
        "fallback_src": os.path.join(ARTIFACT_DIR, "hero_main_png_1794239188410.jpg"),
        "fallback_vf": "crop=iw*0.85:ih*0.85:iw*0.08:ih*0.12,eq=contrast=1.05:saturation=1.08,scale=1400:-2"
    },
    {
        "dst": os.path.join(WORKSPACE, "public", "images", "dishes", "brioche-homard.webp"),
        "url": "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=1400&q=85",
        "fallback_src": os.path.join(ARTIFACT_DIR, "gambas_braisees_png_1794239211028.jpg"),
        "fallback_vf": "crop=iw*0.82:ih*0.82:iw*0.1:ih*0.08,eq=brightness=0.03:saturation=1.12,scale=1400:-2"
    },
    {
        "dst": os.path.join(WORKSPACE, "public", "images", "dishes", "sphere-chocolat.webp"),
        "url": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1400&q=85",
        "fallback_src": os.path.join(ARTIFACT_DIR, "hero_main_png_1794239188410.jpg"),
        "fallback_vf": "crop=iw*0.75:ih*0.75:iw*0.12:ih*0.18,eq=contrast=1.12:brightness=-0.04:saturation=1.15,scale=1400:-2"
    },
    {
        "dst": os.path.join(WORKSPACE, "public", "images", "dishes", "tarte-figues.webp"),
        "url": "https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&w=1400&q=85",
        "fallback_src": os.path.join(ARTIFACT_DIR, "carpaccio_st_jacques_1794239188408.jpg"),
        "fallback_vf": "crop=iw*0.78:ih*0.78:iw*0.11:ih*0.11,hue=h=18:s=1.1,scale=1400:-2"
    },
    {
        "dst": os.path.join(WORKSPACE, "public", "images", "dishes", "nuit-dambre.webp"),
        "url": "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1400&q=85",
        "fallback_src": os.path.join(ARTIFACT_DIR, "elixir_botanique_png_1794239231765.jpg"),
        "fallback_vf": "crop=iw*0.82:ih*0.82:iw*0.09:ih*0.09,hue=h=22:s=1.15,scale=1400:-2"
    },
]

for item in extra_assets:
    temp_jpg = item["dst"].replace(".webp", "_temp.jpg")
    downloaded = False
    try:
        req = urllib.request.Request(item["url"], headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=8) as resp, open(temp_jpg, "wb") as f:
            f.write(resp.read())
        if os.path.getsize(temp_jpg) > 10000:
            subprocess.run([
                FFMPEG, "-y", "-i", temp_jpg,
                "-vf", "scale=1400:-2",
                "-c:v", "libwebp", "-quality", "86",
                item["dst"]
            ], check=True)
            downloaded = True
            print(f"Downloaded & converted {os.path.basename(item['dst'])}")
    except Exception as e:
        print(f"Fallback used for {os.path.basename(item['dst'])}: {e}")
    finally:
        if os.path.exists(temp_jpg):
            os.remove(temp_jpg)

    if not downloaded:
        subprocess.run([
            FFMPEG, "-y", "-i", item["fallback_src"],
            "-vf", item["fallback_vf"],
            "-c:v", "libwebp", "-quality", "86",
            item["dst"]
        ], check=True)
        print(f"Generated fallback WebP for {os.path.basename(item['dst'])}")

# 3. Generate Cinematic Hero Video (MP4 + WebM + Mobile MP4) using FFmpeg zoompan & xfade transitions
img1 = os.path.join(ARTIFACT_DIR, "hero_main_png_1794239188410.jpg")
img2 = os.path.join(ARTIFACT_DIR, "hero_flambe_png_1794239208355.jpg")
img3 = os.path.join(ARTIFACT_DIR, "burger_signature_1794239210260.jpg")
img4 = os.path.join(ARTIFACT_DIR, "cote_de_boeuf_1794239237473.jpg")

mp4_path = os.path.join(WORKSPACE, "public", "videos", "hero-culinary.mp4")
mobile_mp4_path = os.path.join(WORKSPACE, "public", "videos", "hero-culinary-mobile.mp4")
webm_path = os.path.join(WORKSPACE, "public", "videos", "hero-culinary.webm")

filter_complex = (
    "[0:v]scale=2240:1260:force_original_aspect_ratio=increase,crop=2240:1260,"
    "zoompan=z='min(zoom+0.0009,1.15)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=125:s=1920x1080:fps=25,format=yuv420p[v0];"
    "[1:v]scale=2240:1260:force_original_aspect_ratio=increase,crop=2240:1260,"
    "zoompan=z='1.14-0.0008*on':x='iw/2-(iw/zoom/2)+on*0.4':y='ih/2-(ih/zoom/2)':d=125:s=1920x1080:fps=25,format=yuv420p[v1];"
    "[2:v]scale=2240:1260:force_original_aspect_ratio=increase,crop=2240:1260,"
    "zoompan=z='min(zoom+0.0009,1.15)':x='iw/2-(iw/zoom/2)-on*0.3':y='ih/2-(ih/zoom/2)':d=125:s=1920x1080:fps=25,format=yuv420p[v2];"
    "[3:v]scale=2240:1260:force_original_aspect_ratio=increase,crop=2240:1260,"
    "zoompan=z='1.12-0.0007*on':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)+on*0.2':d=125:s=1920x1080:fps=25,format=yuv420p[v3];"
    "[v0][v1]xfade=transition=fade:duration=1.2:offset=3.8[x1];"
    "[x1][v2]xfade=transition=fade:duration=1.2:offset=7.6[x2];"
    "[x2][v3]xfade=transition=fade:duration=1.2:offset=11.4,eq=contrast=1.04:brightness=-0.02:saturation=1.08[outv]"
)

print("Generating desktop MP4 video...")
subprocess.run([
    FFMPEG, "-y",
    "-i", img1, "-i", img2, "-i", img3, "-i", img4,
    "-filter_complex", filter_complex,
    "-map", "[outv]",
    "-c:v", "libx264", "-preset", "fast", "-crf", "23",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    mp4_path
], check=True)

print("Generating mobile MP4 video...")
subprocess.run([
    FFMPEG, "-y",
    "-i", mp4_path,
    "-vf", "scale=1280:720",
    "-c:v", "libx264", "-preset", "fast", "-crf", "26",
    "-pix_fmt", "yuv420p", "-movflags", "+faststart",
    mobile_mp4_path
], check=True)

print("Generating WebM video...")
subprocess.run([
    FFMPEG, "-y",
    "-i", mp4_path,
    "-vf", "scale=1280:720",
    "-c:v", "libvpx-vp9", "-b:v", "1200k", "-deadline", "realtime", "-cpu-used", "4",
    webm_path
], check=True)

# 4. Generate warm gastronomic ambient soundscape (.wav)
# Warm jazz chords + subtle hearth crackle so the audio player works 100% locally
wav_path = os.path.join(WORKSPACE, "public", "audio", "ambiance-gastronomique.wav")
sample_rate = 22050
duration = 16.0
num_samples = int(sample_rate * duration)

# Chord progression: Fmaj9 -> Em7 -> Dm9 -> Cmaj9 (warm lounge acoustic pad)
chords = [
    [174.61, 220.00, 261.63, 329.63, 392.00],  # Fmaj9
    [164.81, 196.00, 246.94, 293.66, 392.00],  # Em7
    [146.83, 174.61, 220.00, 261.63, 329.63],  # Dm9
    [130.81, 164.81, 196.00, 246.94, 293.66],  # Cmaj9
]

random.seed(42)
with wave.open(wav_path, "w") as wav_file:
    wav_file.setnchannels(1)
    wav_file.setsampwidth(2)
    wav_file.setframerate(sample_rate)
    frames = bytearray()
    for i in range(num_samples):
        t = i / sample_rate
        chord_idx = min(int(t / 4.0), 3)
        chord_t = t - chord_idx * 4.0
        # Smooth envelope per 4s chord + loop fade at start/end
        env = math.sin(math.pi * (chord_t / 4.0)) ** 0.7
        global_env = 1.0
        if t < 0.8:
            global_env = t / 0.8
        elif t > duration - 0.8:
            global_env = (duration - t) / 0.8

        val = 0.0
        for freq in chords[chord_idx]:
            # Warm electric piano / Rhodes-like harmonic blend
            val += 0.14 * math.sin(2.0 * math.pi * freq * t)
            val += 0.04 * math.sin(2.0 * math.pi * (freq * 2.0) * t) * math.exp(-chord_t * 0.8)

        # Subtle wood-fire hearth warmth (soft pink-ish murmur + occasional gentle crackle)
        crackle = (random.random() - 0.5) * 0.015
        if random.random() < 0.002:
            crackle += (random.random() - 0.5) * 0.12

        sample = (val * env + crackle) * global_env * 0.45
        sample_int = max(-32767, min(32767, int(sample * 32767)))
        frames.extend(struct.pack("<h", sample_int))
    wav_file.writeframes(frames)

print("All media assets generated successfully!")
