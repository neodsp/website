export interface Project {
  name: string;
  description: string;
  tags: string[];
  code: string;
  filename: string;
  github: string;
  crates?: string;
  docs?: string;
}

export const projects: Project[] = [
  {
    name: "audio-lab",
    description:
      "Offline audio research toolkit — generate test signals, run DSP experiments, and visualize results.",
    tags: ["offline", "research", "plotting"],
    filename: "main.rs",
    code: `use audio_lab::{signal, plot};

// Generate a logarithmic sweep and pink noise
let sweep = signal::generate_sweep(
    48_000,
    20.0..20_000.0,
    &signal::SweepConfig::default(),
)?;
let noise = signal::generate_noise(48_000, &signal::NoiseConfig {
    spectrum: signal::Spectrum::Pink,
    amplitude: 0.2,
    ..Default::default()
})?;

// Mix, inspect, save, and play back
let mixed = audio_lab::mix_time!(sweep, noise)?;
plot::show_freq("spectrum", &mixed.into_freq(), Default::default())?;
npy::write_npy_time(&mixed, "test.npy")?;
playback::play(&mixed)?;`,
    github: "https://github.com/neodsp/audio-lab",
  },
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
  },
  {
    name: "audio-host",
    description:
      "Backend-agnostic library for audio I/O devices — one API for JUCE, CPAL, and RtAudio.",
    tags: ["multi-backend", "real-time", "callback API"],
    filename: "main.rs",
    code: `use audio_host::*;

let host = AudioHost::new()?;

host.start(
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
    github: "https://github.com/neodsp/audio-host",
  },
  {
    name: "web-audio",
    description:
      "Web Audio API bindings for Rust — microphone input, device enumeration, and audio I/O in the browser.",
    tags: ["wasm", "web", "async"],
    filename: "main.rs",
    code: `use web_audio::WebAudio;

// Request microphone permission
WebAudio::request_permission().await?;

// Enumerate available devices
let (inputs, outputs) = WebAudio::enumerate_devices().await?;

// Create audio context and configure devices
let mut audio = WebAudio::new().await?;
audio.set_input_device(Some(inputs[0].device_id.clone()));
audio.set_output_device(Some(outputs[0].device_id.clone())).await?;

// Start processing — interleaved f32: [L0, R0, L1, R1, ...]
audio.start(1024, 2, |input, output| {
    output.copy_from_slice(input);
}).await?;

audio.stop()?;`,
    github: "https://github.com/neodsp/web-audio",
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
  },
];
