import sys
import subprocess
from PIL import Image, ImageSequence
import imageio_ffmpeg

def convert_webp_to_mp4(webp_path, output_mp4_path, fps=10):
    print(f"Loading {webp_path}...")
    im = Image.open(webp_path)
    
    # Target even dimensions for H.264
    w, h = im.size
    target_w = w if w % 2 == 0 else w - 1
    target_h = h if h % 2 == 0 else h - 1
    print(f"Source dimensions: {w}x{h} -> Output dimensions: {target_w}x{target_h} at {fps} fps")
    
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    
    # We pipe raw RGB24 bytes into FFmpeg stdin
    cmd = [
        ffmpeg_exe,
        "-y",
        "-f", "rawvideo",
        "-vcodec", "rawvideo",
        "-s", f"{target_w}x{target_h}",
        "-pix_fmt", "rgb24",
        "-r", str(fps),
        "-i", "-",
        "-c:v", "libx264",
        "-preset", "slow",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
        output_mp4_path
    ]
    
    print("Starting FFmpeg encoder process...")
    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    
    count = 0
    for frame in ImageSequence.Iterator(im):
        rgb_frame = frame.convert("RGB")
        if rgb_frame.size != (target_w, target_h):
            rgb_frame = rgb_frame.crop((0, 0, target_w, target_h))
        proc.stdin.write(rgb_frame.tobytes())
        count += 1
        if count % 50 == 0:
            print(f"Encoded {count} frames...")
            
    proc.stdin.close()
    stdout, stderr = proc.communicate()
    
    if proc.returncode != 0:
        print("FFmpeg error:", stderr.decode("utf-8", errors="ignore"))
        sys.exit(proc.returncode)
        
    print(f"Successfully converted {count} frames into {output_mp4_path}!")

if __name__ == "__main__":
    convert_webp_to_mp4("ofrenda_viva_demo.webp", "ofrenda_viva_demo.mp4", fps=10)
