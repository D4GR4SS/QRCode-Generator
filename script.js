const form = document.getElementById('generate-form'),
  qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();

  const url = document.getElementById('url').value,
    size = document.getElementById('size').value,
    re =
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  if (!re.test(url.trim())) {
    alert('Please enter a URL');
  } else {
    showSpinner();

    setTimeout(() => {
      hideSpinner();

      generateQRCode(url, size);

      setTimeout(() => {
        const saveUrl = qr.querySelector('img').src;
        createSaveBtn(saveUrl, size);
      }, 50);
    }, 700);
  }
};

const generateQRCode = (url, size) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
  });
};

const showSpinner = () =>
  (document.getElementById('spinner').style.display = 'block');

const hideSpinner = () =>
  (document.getElementById('spinner').style.display = 'none');

const clearUI = () => {
  qr.innerHTML = '';
  const saveLink = document.getElementById('save-link');
  // if (saveLink) saveLink.remove();
  saveLink ? saveLink.remove() : saveLink;
};

const createSaveBtn = (saveUrl, size) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList = 'btn save-btn';
  link.href = saveUrl;
  link.style.width = `${size}px`;
  link.download = 'qrcode';
  link.innerHTML = `Save Image <i class="ri-download-line icon"></i>`;
  document.getElementById('generated').appendChild(link);
};

hideSpinner();

const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

form.addEventListener('submit', onGenerateSubmit);
form.addEventListener('reset', clearUI);
