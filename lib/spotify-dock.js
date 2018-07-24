'use babel'

import SpotifyDockView from './spotify-dock-view'
import { CompositeDisposable } from 'atom'

const { workspace, commands, config } = atom

export default {

  subscriptions: new CompositeDisposable(),
  view: new SpotifyDockView({
    options: {
      colorize: config.get('spotify-dock.colorize')
    }
  }),

  async activate() {
    await this.mountDock()

    this.subscriptions.add(config.observe('spotify-dock.colorize', enabled => {
      this.view.toggleColorize(enabled)
    }))

    this.view.getArtElement().addEventListener('mousedown', function (event) {
      commands.dispatch(this, 'spotify-status:toggle-pause')
    })
  },

  deactivate() {
    this.view.destroy()
  },

  consumeSpotifyPlayer(player) {
    player.on('track-change', this.view.updateTrack.bind(this.view))
    player.on('end', () => {
      player.off(this.view.updateTrack.bind(this.updateTrack))
      this.view.hide()
      player.once('ready', () => {
        this.view.show()
        player.on('track-change', this.view.updateTrack.bind(this.view))
      })
    })
    player.on('toggle-pause', playing => {
      this.view.updatePaused(!playing)
    })
    player.on('error', (error) => {
      console.error('player error', error)
      this.deactivate()
    })
  },

  async mountDock() {
    // Check if not already mounted
    // if (!atom.workspace.paneForItem(this.view.getElement())) {
    const showOnAttach = !workspace.getActivePaneItem()
    const workspacePane = await workspace.open(this.view, {
      activatePane: showOnAttach,
      activateItem: showOnAttach
    })
    //   return workspacePane
    // } else {
    //   const pane = atom.workspace.paneForItem(this.dockElement)
    //     if (pane) pane.removeItem(this.dockElement)
    // }
  },
}