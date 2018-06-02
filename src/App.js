import React, { Component } from 'react'
import Clock from './componenets/Clock'
import NoSleep from 'nosleep.js'
import './App.scss'

class App extends Component {
  constructor () {
    super()

    this.noSleep = new NoSleep();
  }



  toggleFullScreen = () => {
    var doc = document;
    var docEl = this.refs.app;

    var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

    if(this.isFullScreen()) {
      this.noSleep.enable();
      requestFullScreen.call(docEl);
    }
    else {
      this.noSleep.disable();
      cancelFullScreen.call(doc);
    }
  }

  isFullScreen = () => {
    return (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement)
  }

  render () {

      return (
        <div className='App' ref='app' id='app'>
          <Clock onClick={this.toggleFullScreen} />
        </div>
      )
    }
}

export default App
