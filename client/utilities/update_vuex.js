export const updateVuexSynth = {
  methods: {
    updateVuexSynth(value, key, subKey, tertiaryKey) {
    	let update = {}

        if(tertiaryKey) {
            update = {
                [key]: {
                    [subKey]: {
                        [tertiaryKey]: value
                    }
                }
            }
        } else if (!tertiaryKey && subKey) {
    		update = {
    			[key]: {
    				[subKey]: value
    			}
    		}
    	} else {
    		update = {
    			[key]: value
    		}
    	}

    	this.$store.commit('UPDATE_SYNTH_MEMBER_VALUES', update)
    }
  }
}

export const updateVuexFilter = {
    methods: {
        updateVuexFilter(value, key) {
            let update = {
                [key]: value
            }

            this.$store.commit('UPDATE_FILTER_MEMBER_VALUES', update)

        }
    }
}