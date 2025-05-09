export function Footer() {
    const footer = document.createElement('footer');
    footer.style.padding = '2em';
    footer.style.backgroundColor = 'var(--purple)';
    footer.style.marginTop = "100px";
    footer.style.textAlign = 'center';
  
    const enlaces = [
      { href: '/sugerencias', texto: 'Sugerencias' },
      { href: '/terminos', texto: 'Términos y Condiciones' }
    ];
  
    enlaces.forEach((enlace, index) => {
      const a = document.createElement('a');
      a.style.color= "var(--white)";
      a.href = enlace.href;
      a.textContent = enlace.texto;
      a.style.margin = '0 10px';
      footer.appendChild(a);
  
      if (index < enlaces.length - 1) {
        const separator = document.createTextNode('|');
        footer.appendChild(separator);
      }
    });
  
    return footer;
  }
  