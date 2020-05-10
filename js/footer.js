class Footer {
  constructor() {
    this.createFooter();
  }

  createFooter() {
    const footer = document.createElement('footer');
    const footerText = this.createFooterText();
    const footerImageLink = this.createFooterImage();

    footer.classList.add('footer', 'wrapper', 'bg-dark');
    footer.appendChild(footerText);
    footer.appendChild(footerImageLink);
    document.body.appendChild(footer);
  }

  createFooterText() {
    const footerText = document.createElement('div');

    footerText.classList.add('footer-text');
    footerText.innerText = 'RS School 2020q1';

    return footerText;
  }

  createFooterImage() {
    const footerImageLink = document.createElement('a');
    const footerImage = document.createElement('img');

    footerImageLink.href = 'https://github.com/';
    footerImageLink.classList.add('footer-image');
    footerImage.src = './assets/git-logo.png';
    footerImage.alt = 'GitHub';
    footerImageLink.appendChild(footerImage);

    return footerImageLink;
  }
}

export default Footer;
