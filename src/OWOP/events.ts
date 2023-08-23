

let evtId = OWOP.events.loaded - 1; // loaded is first event which is accessible in the wild
export const eventIds = {
	loaded: ++evtId,
	init: ++evtId,
	tick: ++evtId,
	misc: {
		toolsRendered: ++evtId,
		toolsInitialized: ++evtId,
		logoMakeRoom: ++evtId,
		worldInitialized: ++evtId,
		windowAdded: ++evtId,
		captchaToken: ++evtId,
		loadingCaptcha: ++evtId
	},
	renderer: {
		addChunk: ++evtId,
		rmChunk: ++evtId,
		updateChunk: ++evtId
	},
	camera: {
		moved: ++evtId,
		zoom: ++evtId /* (zoom value), note that this event should not be used to SET zoom level. */
	},
	net: {
		connecting: ++evtId,
		connected: ++evtId,
		disconnected: ++evtId,
		playerCount: ++evtId,
		chat: ++evtId,
		devChat: ++evtId,
		world: {
			leave: ++evtId,
			join: ++evtId, /* (worldName string) */
			joining: ++evtId, /* (worldName string) */
			setId: ++evtId,
			playersMoved: ++evtId, /* (Object with all the updated player values) */
			playersLeft: ++evtId,
			tilesUpdated: ++evtId,
			teleported: ++evtId
		},
		chunk: {
			load: ++evtId, /* (Chunk class) */
			unload: ++evtId, /* (x, y) */
			set: ++evtId, /* (x, y, data), backwards compat */
			lock: ++evtId,
			allLoaded: ++evtId
		},
		sec: {
			rank: ++evtId
		},
		maxCount: ++evtId,
		donUntil: ++evtId
	}
};