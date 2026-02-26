export interface Project {
  name: string;
  description: string;
  tags: string[];
  code: string;
  filename: string;
  github: string;
  crates: string;
  docs: string;
  stars: number;
}

export const projects: Project[] = [
  {
    name: "audio-blocks",
    description:
      "Real-time safe abstractions over audio data with support for all common layouts.",
    tags: ["real-time safe", "no-std", "f32/f64"],
    filename: "main.rs",
    code: `use audio_blocks::*;

// Create a stereo block with 512 samples per channel
let mut block = Planar::<f32>::new(2, 512);

// Process each channel independently
for channel in block.channels_mut() {
    for sample in channel.iter_mut() {
        *sample *= 0.5; // apply gain
    }
}`,
    github: "https://github.com/neodsp/audio-blocks",
    crates: "https://crates.io/crates/audio-blocks",
    docs: "https://docs.rs/audio-blocks",
    stars: 11,
  },
  {
    name: "audio-file",
    description:
      "Read any audio format and write WAV files with a simple, ergonomic API.",
    tags: ["16+ formats", "symphonia", "resampling"],
    filename: "main.rs",
    code: `use audio_file::read;

// Read any audio format — MP3, FLAC, WAV, OGG, AAC...
let audio = audio_file::read::<f32>(
    "recording.mp3",
    Default::default(),
)?;

println!("Sample rate: {}", audio.sample_rate);
println!("Channels: {}", audio.num_channels);
println!("Samples: {}", audio.samples_interleaved.len());`,
    github: "https://github.com/neodsp/audio-file",
    crates: "https://crates.io/crates/audio-file",
    docs: "https://docs.rs/audio-file",
    stars: 7,
  },
  {
    name: "audio-device",
    description:
      "Backend-agnostic library for audio I/O devices — one API for JUCE, CPAL, and RtAudio.",
    tags: ["multi-backend", "real-time", "callback API"],
    filename: "main.rs",
    code: `use audio_device::prelude::*;

let device = AudioDevice::new()?;

device.start(
    Config {
        num_input_channels: 2,
        num_output_channels: 2,
        sample_rate: 48000,
        num_frames: 512,
    },
    // Real-time audio callback
    move |input, mut output| {
        output.copy_from_block(&input);
    },
)?;`,
    github: "https://github.com/neodsp/audio-device",
    crates: "https://crates.io/crates/audio-device",
    docs: "https://docs.rs/audio-device",
    stars: 1,
  },
  {
    name: "fft-convolver",
    description:
      "Fast, real-time safe FFT convolution — zero allocations during audio processing.",
    tags: ["real-time safe", "zero-alloc", "f32/f64", "partitioned FFT"],
    filename: "main.rs",
    code: `use fft_convolver::FFTConvolver;

// Load an impulse response (e.g. a room reverb)
let impulse_response: Vec<f32> = load_ir("hall.wav");

let mut convolver = FFTConvolver::default();
convolver.init(512, &impulse_response)?;

// Process audio — real-time safe, no allocations
let mut output = vec![0.0f32; input.len()];
convolver.process(&input, &mut output)?;`,
    github: "https://github.com/neodsp/fft-convolver",
    crates: "https://crates.io/crates/fft-convolver",
    docs: "https://docs.rs/fft-convolver",
    stars: 33,
  },
];
