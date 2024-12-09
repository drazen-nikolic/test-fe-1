import { App } from './app/app';
import { createRoot } from "react-dom/client";
import type { Root } from 'react-dom/client';

class ReactMFE extends HTMLElement {
  private postId: string | null = null;
  private root: Root | null = null;
  private mountPoint: HTMLDivElement | null = null;

  static get observedAttributes() {
    return ['post-id'];
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'post-id') {
      this.postId = newValue;
      this.updateApp();
    }
  }

  connectedCallback() {
    this.mountPoint = document.createElement('div');
    this.appendChild(this.mountPoint);
    this.root = createRoot(this.mountPoint);
    this.updateApp();
  }

  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }

  private updateApp() {
    if (this.root) {
      this.root.render(<App />);
    }
  }
}

customElements.define('react-mfe', ReactMFE);