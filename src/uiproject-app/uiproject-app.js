import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/app-layout/app-layout.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-header/app-header.js';

/**
 * @customElement
 * @polymer
 */
class UiprojectApp extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        app-header{
          border-bottom:1px #ccc solid;
          background:#ff6200;
          color:#fff;
        }
      </style>
      <app-location route="{{route}}"  url-space-regex="^/"></app-location>
      <app-route route="{{route}}" pattern="/:page" data="{{routeData}}"></app-route> 
      <app-header-layout>
  <app-header slot="header" fixed>
    <app-toolbar>
      <div main-title>Data Protection Breach</div>
    </app-toolbar>
  </app-header>
  <div>
    
  </div>
</app-header-layout>
<iron-pages selected="[[page]]" attr-for-selected="name" role="main">
          <dbp-login name="home" route="{{route}}"></dbp-login>
          <dbp-breach name="breach" route="{{route}}"></dbp-breach>
          <dbp-notfound name="notFound" route="{{route}}"></dbp-notfound>
        </iron-pages>

    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'uiproject-app'
      },
      page: {
          type:String,
          reflectToAttribute:true,
          observer:"_pageChanged"
      },
      routeData: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.page)'
    ];
  }
    _routePageChanged(page) {
    if (!page) {
      this.page = 'home';
    }else if (['home', 'breach','notFound'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'notFound';
    }
  }
    _pageChanged(page) {
    switch (page) {
      case 'home':
        import('./dbp-login.js');
        break;
      case 'breach':
        import('./dbp-breach.js');
        break;
      case 'notFound':
        import('./dbp-notfound.js');
        break;
    }
  }
}

window.customElements.define('uiproject-app', UiprojectApp);
