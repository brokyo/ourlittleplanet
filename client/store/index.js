import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var _ = require('lodash')

export const state = ({
  meta: {
    title: 'Our Little Planet',
    intro: 'It\'s a chance to sit quietly and make something small just for you. Take it',
    creator: '',
    length: 180,
    live: false
  },
  tone: {
    synth: 'AMSynth',
    synthMemberValues: {
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
        release: 5,
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
    filter: false,
    filterMemberValues: {
      frequency: 1,
      type: 'lowpass',
      rolloff: -12,
      Q: 1
    },
    effectsConfig: [{name: 'Chorus', active: false}, {name: 'FeedbackDelay', active: false}, {name: 'Tremolo', active: false}, {name: 'Vibrato', active: false}],
    effectValues: { Chorus: {frequency: 1.5, delayTime: 3.5, depth: 0.7, feedback: 0.1, type: 'sine', spread: 180, wet: 1}, FeedbackDelay: {delayTime: 0.25, feedback: 0.5, wet: 1}, Tremolo: {frequency: 10, type: 'sine', depth: 0.5, spread: 180, wet: 1}, Vibrato: { maxDelay: 0.005, frequency: 5, depth: 0.1, type: 'sine', wet: 1} }
  },
  scale: {
    config: {
      octave1: 4,
      octave2: 5,
      key: 'D',
      scaleName: 'Dark (In Scale)',
      steps: [0, 2, 6, 8, 10]
    }
  },
  video: {
    videoId: '',
    params: {
      start: 0,
      end: 0,
      volume: 100
    }
  },
  overlay: {
    colorConfig: [
      {
        name: 'octave1',
        config: {
          'display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'flex-start'
        },
        styles: [
          {id: 0, grow: 1, offsetTop: 0, offsetLeft: 0, color: '#E583B4', startOpacity: 0, endOpacity: 1},
          {id: 1, grow: 1, offsetTop: 0, offsetLeft: 0, color: '#FAEE31', startOpacity: 0, endOpacity: 1},
          {id: 2, grow: 1, offsetTop: 0, offsetLeft: 0, color: '#67CAF4', startOpacity: 0, endOpacity: 1},
          {id: 3, grow: 1, offsetTop: 0, offsetLeft: 0, color: '#F2A172', startOpacity: 0, endOpacity: 1},
          {id: 4, grow: 1, offsetTop: 0, offsetLeft: 0, color: '#0F1A23', startOpacity: 0, endOpacity: 1}
        ]
      },
      {
        name: 'octave2',
        config: {
          'display': 'flex',
          'flex-direction': 'column',
          'justify-content': 'flex-start'
        },
        styles: [
          {id: 5, grow: 1, offsetTop: 0, offsetLeft: 0, color: '#CE5814', startOpacity: 0, endOpacity: 1},
          {id: 6, grow: 1, offsetTop: 0, offsetLeft: 0, color: '#72F2C2', startOpacity: 0, endOpacity: 1},
          {id: 7, grow: 1, offsetTop: 0, offsetLeft: 0, color: '#A472F2', startOpacity: 0, endOpacity: 1},
          {id: 8, grow: 1, offsetTop: 0, offsetLeft: 0, color: '#E4F272', startOpacity: 0, endOpacity: 1},
          {id: 9, grow: 1, offsetTop: 0, offsetLeft: 0, color: '#C7F272', startOpacity: 0, endOpacity: 1}
        ]
      }
    ]
  },
  corruption: [
    {
      type: 'compression',
      active: true,
      members: {
        ratio: 20,
        // ratio: 1,
        threshold: -15,
        release: 0,
        attack: 0,
        knee: 10
      },
      start: 80
    },
    {
      type: 'detune',
      active: true,
      detuneAmount: -5,
      interval: 10,
      start: 120
    },
    {
      type: 'volumeDown',
      active: true,
      volumeDecrease: 1,
      minVolume: -20,
      interval: 8,
      start: 140
    }
  ]
})

export const mutations = {
  // ===== //
  // VIDEO //
  // ===== //
  SET_VIDEO_PARAMS (context, param) {
    _.merge(context.video, param)
  },
  // ======= //
  // OVERlAY //
  // ======= //
  SET_OVERLAY_BAND_PARAMS (context, param) {
    var bandStyle = _.find(context.overlay.colorConfig[param.meta.arrayIndex].styles, {id: param.meta.id})
    _.merge(bandStyle, param.payload)
  },
  SET_OVERLAY_GROUP_PARAMS (context, param) {
    _.merge(context.overlay.colorConfig[param.meta.arrayIndex].config, param.payload)
  },
  RANDOM_OVERLAY_BAND (context, update) {
    _.merge(context.overlay.colorConfig[update.meta.arrayIndex].styles[update.meta.bandIndex], update.band)
  },
  RANDOM_OVERLAY_GROUP (context, update) {
    _.merge(context.overlay.colorConfig[update.meta.arrayIndex].config, update.config)
  },
  // ===== //
  // SYNTH //
  // ===== //
  CHANGE_SYNTH_TYPE (context, payload) {
    context.tone.synth = payload.synthName
    context.tone.synthMemberValues = payload.synthMemberValues
  },
  UPDATE_SYNTH_MEMBER_VALUES (context, update) {
    _.merge(context.tone.synthMemberValues, update)
  },
  // ======= //
  // EFFECTS //
  // ======= //
  UPDATE_EFFECT_CONFIG (context, payload) {
    _.merge(context.tone.effectValues[payload.effect], payload.update)
  },
  // ====== //
  // FILTER //
  // ====== //
  TOGGLE_ACTIVE_FILTER (context) {
    context.tone.filter = !context.tone.filter
  },
  UPDATE_FILTER_MEMBER_VALUES (context, update) {
    _.merge(context.tone.filterMemberValues, update)
  },
  // ======== //
  // TRIGGERS //
  // ======== //
  SET_OCTAVE1 (context, octave) {
    context.scale.config.octave1 = octave
  },
  SET_OCTAVE2 (context, octave) {
    context.scale.config.octave2 = octave
  },
  SET_KEY (context, key) {
    context.scale.config.key = key
  },
  SET_SCALE (context, scale) {
    context.scale.config.scaleName = scale.name
    context.scale.config.steps = scale.steps
  },
  // ======= //
  // OVERLAY //
  // ======= //
  SET_COLORS (context, colorValues) {
    context.visuals.colorFilter = colorValues
  },
  // ==== //
  // META //
  // ==== //
  UPDATE_META (context, payload) {
    _.merge(context.meta, payload)
  },
  // ========== //
  // CORRUPTION //
  // ========== //
  SET_CORRUPTION_PARMS (context, payload) {
    _.merge(context.corruption, payload)
  },
  // ======= //
  // GENERAL //
  // ======= //
  MOUNT_TRIGGERS (context) {
    context.meta.triggersMounted = true
  },
  // =============== //
  // INDIVIDUAL PAGE //
  // =============== //
  PLAY_CONFIG (context, config) {
    context.meta = config.meta
    context.tone = config.tone
    context.scale = config.scale
    context.video = config.video
    context.overlay = config.overlay
    context.corruption = config.corruption
  }
}

export const actions = {
  // ===== //
  // SYNTH //
  // ===== //
  MUNGE_SYNTH_UPDATE (context, payload) {
    let update = {}

    if (payload.subsubfield) {
      update = {
        [payload.field]: {
          [payload.subfield]: {
            [payload.subsubfield]: payload.value
          }
        }
      }
    } else if (payload.subfield) {
      update = {
        [payload.field]: {
          [payload.subfield]: payload.value
        }
      }
    } else {
      update = {
        [payload.field]: payload.value
      }
    }

    context.commit('SET_SYNTH_MEMBER_VALUES', {synth: context.getters.constructed_synth, update: update})
  },
  // ====== //
  // FILTER //
  // ====== //
  UPDATE_FILTER_MEMBER_VALUES (context, values) {
    context.commit('SET_FILTER_MEMBER_VALUES', {filter: context.getters.constructed_filter, values: values})
  },
  // ========= //
  // Firebase //
  // ========= //
  GET_MUSICBOXES (context) {
    console.log(this.$db)
  }
}


export const getters = {
  active_scale: state => {
    let octave1 = state.scale.config.octave1
    let octave2 = state.scale.config.octave2
    let key = state.scale.config.key
    let steps = state.scale.config.steps

    let possibleNotes = ['A', 'A#', 'B', 'B#', 'C', 'C#', 'D', 'D#', 'E', 'E#', 'F', 'F#', 'G', 'G#']
    let keyCodes = ['q', 'w', 'e', 'r', 't', 'h', 'j', 'k', 'l', ';']
    let newOrigin = possibleNotes.indexOf(key)
    let newScale = possibleNotes.slice(newOrigin).concat(possibleNotes.slice(0, newOrigin))

    let scale = []
    for (let i = 0; i < 10; i++) {
      let trigger = {}
      if (i < 5) {
        trigger = {
          id: i,
          keyCode: keyCodes[i],
          note: newScale[steps[i]],
          octave: octave1
        }
      } else {
        trigger = {
          id: i,
          keyCode: keyCodes[i],
          note: newScale[steps[i - 5]],
          octave: octave2
        }
      }
      trigger.noteToPlay = String(trigger.note) + String(trigger.octave)
      scale.push(trigger)
    }

    return scale
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

export default store