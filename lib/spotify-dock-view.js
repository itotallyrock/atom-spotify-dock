'use babel'

const PANE_URI = 'atom://spotify/dock'

export default class SpotifyDockView {
  constructor (state = {}) {
    let options = Object.assign({}, {
      colorize: false
    }, state.options)

    this.container = document.createElement('spotify-dock')
    this.details = document.createElement('song-details')
    this.title = document.createElement('song-title')
    this.artist = document.createElement('song-artist')
    this.albumArt = document.createElement('song-artwork')

    this.container.appendChild(this.albumArt)
    this.details.appendChild(this.title)
    this.details.appendChild(this.artist)
    this.container.appendChild(this.details)

    this.container.setAttribute('track-uri', '')
    this.toggleColorize(options.colorize)
  }

  updateTrack(track) {
    this.getElement().setAttribute('track-uri', track.uri)
    this.updateArtwork(track.artwork)
    this.updateArtist(track.artists)
    this.updateTitle(track.title)
  }

  updateArtwork (imageURL) {
    this.getArtElement().setAttribute('style', 'background-image: url("' + imageURL + '")')
  }

  updateTitle (title) {
    this.getTitleElement().innerText = title
  }

  updateArtist (artists) {
    this.getArtistElement().innerText = artists.join(', ')
  }

  updatePaused (paused) {
    this.getElement().classList.toggle('paused', paused)
  }

  toggleColorize (enable) {
    if (enable == null) {
      this.getArtElement().classList.toggle('colorize')
    } else if (enable) {
      this.getArtElement().classList.add('colorize')
    } else {
      this.getArtElement().classList.remove('colorize')
    }
  }

  // The following methods are required or assist in the creation of the docking pane
  destroy () {
    this.getElement().remove()
  }

  getElement () {
    return this.container
  }

  getArtElement () {
    return this.getElement().querySelector('song-artwork')
  }

  getArtistElement () {
    return this.getElement().querySelector('song-artist')
  }

  getTitleElement () {
    return this.getElement().querySelector('song-title')
  }

  getTitle () {
    return 'Spotify'
  }

  getURI () {
    return PANE_URI
  }

  getLongTitle () {
    return 'Spotify Dock'
  }

  isPermanentDockItem () {
    return true
  }

  getDefaultLocation () {
    return 'right'
  }

  getPreferredLocation () {
    return 'right'
  }

  getPreferredWidth () {
    return 300
  }

  getAllowedLocations () {
    return [
      'left',
      'right'
    ]
  }
}