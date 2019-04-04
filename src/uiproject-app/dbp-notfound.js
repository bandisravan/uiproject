import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

class DbpNotFound extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
        .card{
            margin:0 auto;
            padding:25px;
            width:600px;
            borde-radius:5px;
            border:1px #ccc solid;
        }
        .content{
            font-size:16px;
        }
      </style>
      <div class="card content">
      Page Not Found.
      </div>
    `;
  }

}

window.customElements.define('dbp-notfound', DbpNotFound);