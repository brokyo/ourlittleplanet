export default {
  synthDefaults: {
      Synth: {
        detune: 0,
        volume: 0,
        portamento: 0,
        oscillator: {
            type: 'sine'
        },
        envelope: {
            attack: 0.005,
            attackCurve: 'linear',
            decay: 0.1,
            sustain: 0.9,
            release: 1,
            releaseCurve: 'linear'
        }
      },
      MonoSynth: {
        detune: 0,
        volume: -10,
        portamento: 0,
        oscillator: {
          type: 'sine'
        },
        filter: {
          Q: 6,
          type: 'lowpass',
          rolloff: -24,
          wet: 0
        },
        envelope: {
          attack: 0.005,
          attackCurve: 'linear',
          decay: 0.1,
          sustain: 0.9,
          release: 1,
          releaseCurve: 'linear'
        },
        filterEnvelope: {
          attack: 0.06,
          decay: 0.2,
          sustain: 0.5,
          release: 2,
          baseFrequency: 200,
          octaves: 7,
          exponent: 2
        }
      },
      AMSynth: {
        oscillator: {
          type: 'sine'
        },
        volume: 0,
        harmonicity: 3,
        detune: 0,
        portamento: 0,
        modulation: {
          type: 'square'
        },
        envelope: {
          attack: 0.01,
          attackCurve: 'linear',
          decay: 0.01,
          sustain: 1,
          release: 0.5,
          releaseCurve: 'linear'
        },
        modulationEnvelope: {
          attack: 0.5,
          attackCurve: 'linear',
          decay: 0,
          sustain: 1,
          release: 0.5,
          releaseCurve: 'linear'
        }
      },
      FMSynth: {
        oscillator: {
          type: 'sine'
        },
        volume: 0,
        harmonicity: 3,
        modulationIndex: 10,
        detune: 0,
        portamento: 0,
        modulation: {
          type: 'square'
        },
        envelope: {
          attack: 0.01,
          attackCurve: 'linear',
          decay: 0.01,
          sustain: 1,
          release: 0.5,
          releaseCurve: 'linear'
        },
        modulationEnvelope: {
          attack: 0.5,
          attackCurve: 'linear',
          decay: 0,
          sustain: 1,
          release: 0.5,
          releaseCurve: 'linear'
        }
      },
      DuoSynth: {
        vibratoAmount: 0.5,
        vibratoRate: 5,
        harmonicity: 1.5,
        voice0: {
          volume: -10,
          portamento: 0,
          detune: 0,
          oscillator: {
            type: 'sine'
          },
          envelope: {
            attack: 0.01,
            attackCurve: 'linear',
            decay: 0,
            sustain: 1,
            release: 0.5,
            releaseCurve: 'linear'
          },
          filterEnvelope: {
            attack: 0.01,
            attackCurve: 'linear',
            decay: 0,
            sustain: 1,
            release: 0.5,
            releaseCurve: 'linear'
          }
        },
        voice1: {
          volume: -10,
          portamento: 0,
          detune: 0,
          oscillator: {
            type: 'sine'
          },
          envelope: {
            attack: 0.01,
            attackCurve: 'linear',
            decay: 0,
            sustain: 1,
            release: 0.5,
            releaseCurve: 'linear'
          },
          filterEnvelope: {
            attack: 0.01,
            attackCurve: 'linear',
            decay: 0,
            sustain: 1,
            release: 0.5,
            releaseCurve: 'linear'
          }
        }
      },
  },
  scales: [
      {
        name: 'Bright (Yo Scale)',
        config: [
          { id: 0, keyCode: 'q', note: 'D', octave: 4 },
          { id: 1, keyCode: 'w', note: 'E', octave: 4 },
          { id: 2, keyCode: 'e', note: 'G', octave: 4 },
          { id: 3, keyCode: 'r', note: 'A', octave: 4 },
          { id: 4, keyCode: 't', note: 'B', octave: 4 },
          { id: 5, keyCode: 'h', note: 'D', octave: 5 },
          { id: 6, keyCode: 'j', note: 'E', octave: 5 },
          { id: 7, keyCode: 'k', note: 'G', octave: 5 },
          { id: 8, keyCode: 'l', note: 'A', octave: 5 },
          { id: 9, keyCode: ';', note: 'B', octave: 5 }
        ],
        triggers: {
          key: 'D',
          octave1: 4,
          octave2: 5
        },
        steps: [0, 2, 6, 8, 10]
      },
      {
        name: 'Dark (In Scale)',
        config: [
          { id: 0, keyCode: 'q', note: 'D', octave: 3 },
          { id: 1, keyCode: 'w', note: 'D#', octave: 3 },
          { id: 2, keyCode: 'e', note: 'G', octave: 3 },
          { id: 3, keyCode: 'r', note: 'A', octave: 3 },
          { id: 4, keyCode: 't', note: 'A#', octave: 3 },
          { id: 5, keyCode: 'h', note: 'D', octave: 4 },
          { id: 6, keyCode: 'j', note: 'D#', octave: 4 },
          { id: 7, keyCode: 'k', note: 'G', octave: 4 },
          { id: 8, keyCode: 'l', note: 'A', octave: 4 },
          { id: 9, keyCode: ';', note: 'A#', octave: 4 }
        ],
        triggers: {
          key: 'D',
          octave1: 3,
          octave2: 4
        },
        steps: [0, 1, 6, 8, 9]
      }
    ],
  generalConfigOptions: {
    oscillators: {
      standard: ['sine', 'square', 'triangle', 'sawtooth']
    },
    envelopeCurves: ['linear', 'exponential', 'sine', 'cosine', 'bounce', 'ripple', 'step'],
    filter: {
      allTypes: ['lowpass', 'highpass', 'bandpass', 'lowshelf', 'highshelf', 'notch', 'allpass', 'peaking'],
      rollOffValues: [-12, -24, -48, -96]
    }
  }
}
