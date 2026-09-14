import subprocess
import os

os.makedirs('public', exist_ok=True)
os.makedirs('dist', exist_ok=True)

def generate_video(clips, final_path):
    print(f"Creating {final_path}...")
    temp_files = []
    
    for i, clip in enumerate(clips):
        img = clip['img']
        title = clip.get('title', '').replace("'", "\\'")
        sub = clip.get('sub', '').replace("'", "\\'")
        duration = clip.get('duration', 3)
        temp_out = f"/tmp/part_{i}_{os.path.basename(final_path)}"
        temp_files.append(temp_out)
        
        # Fast, clean, professional video filter
        filter_complex = (
            f"scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,"
            f"drawbox=y=ih-110:color=black@0.65:width=iw:height=110:t=fill,"
            f"drawtext=text='{title}':fontcolor=0xFFD700:fontsize=30:x=32:y=h-85,"
            f"drawtext=text='{sub}':fontcolor=white:fontsize=19:x=32:y=h-50"
        )
        
        cmd = [
            'ffmpeg', '-y',
            '-loop', '1', '-t', str(duration),
            '-i', img,
            '-vf', filter_complex,
            '-c:v', 'libx264', '-crf', '24', '-preset', 'fast',
            '-pix_fmt', 'yuv420p',
            '-movflags', '+faststart',
            temp_out
        ]
        subprocess.run(cmd, check=True)
        
    concat_file = f"/tmp/list_{os.path.basename(final_path)}.txt"
    with open(concat_file, "w") as f:
        for tf in temp_files:
            f.write(f"file '{tf}'\n")
            
    concat_cmd = [
        'ffmpeg', '-y',
        '-f', 'concat', '-safe', '0',
        '-i', concat_file,
        '-c', 'copy',
        '-movflags', '+faststart',
        final_path
    ]
    subprocess.run(concat_cmd, check=True)
    print(f"Done: {final_path}")

# 1. Hero Section Video (Roofseal / Elastomeric Membrane)
generate_video([
    {
        'img': 'public/dr-fixit-logo.jpg',
        'title': 'DR. FIXIT ROOFSEAL WATERPROOFING',
        'sub': 'PU Acrylic Hybrid Technology | 10°C Cooling Effect',
        'duration': 3.5
    },
    {
        'img': 'public/about/about-waterproofing-work.jpg',
        'title': 'ELASTOMERIC WATERPROOF BARRIER',
        'sub': 'Continuous Seamless Polymer Coating on Terrace Slab',
        'duration': 4
    },
    {
        'img': 'public/projects/residential-waterproofing.jpg',
        'title': '7-YEAR LEAKAGE WARRANTY',
        'sub': 'Foot-Trafficable | High Tensile Elastic Membrane',
        'duration': 3.5
    }
], 'public/roofseal-video.mp4')

# 2. Why Choose Us Video (Why Aquaseal Execution)
generate_video([
    {
        'img': 'public/about/about-waterproofing-work.jpg',
        'title': 'AQUASEAL ON-SITE APPLICATION',
        'sub': 'Precision Crack Routing & Substrate Chemical Priming',
        'duration': 3.5
    },
    {
        'img': 'public/before-after/brick-terrace-before-after.jpg',
        'title': 'PARAPET SKIRTING & CORNER COVING',
        'sub': 'Vertical Waterproof Banding up to 300mm against Seepage',
        'duration': 4
    },
    {
        'img': 'public/projects/commercial-waterproofing.jpg',
        'title': 'JOINTLESS SLAB PROTECTION',
        'sub': 'Engineered Waterproof Membrane for Long-Term Durability',
        'duration': 3.5
    }
], 'public/why-aquaseal-video.mp4')

# 3. Process Section Video (Step-by-Step Systematic Execution)
generate_video([
    {
        'img': 'public/before-after/terrace-before-after.jpg',
        'title': 'STEP 1 & 2: SURFACE PREPARATION',
        'sub': 'Deep Moisture Diagnostic & Loose Debris Grinding',
        'duration': 3.5
    },
    {
        'img': 'public/about/about-waterproofing-work.jpg',
        'title': 'STEP 3: WATERPROOFING APPLICATION',
        'sub': 'Multi-coat Liquid Polymer Cross-Roller Coating',
        'duration': 4
    },
    {
        'img': 'public/projects/residential-waterproofing.jpg',
        'title': 'STEP 4: FINAL INTEGRITY CHECK',
        'sub': '48-Hour Ponding Test & 100% Watertight Guarantee',
        'duration': 3.5
    }
], 'public/process-video.mp4')

print("All 3 MP4 video files created successfully!")
