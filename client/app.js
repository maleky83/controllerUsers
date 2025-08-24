const users = document.querySelector('#users');
const form = document.querySelector('#form');
const name = document.querySelector('#name');
const password = document.querySelector('#password');
const detail = document.querySelector('#detail');
const nav = document.querySelector('#nav');
const url = 'https://controllerusers.onrender.com/users';

form.addEventListener('submit', e => {
  e.preventDefault();
  const item = {
    name: name.value,
    password: password.value,
    detail: detail.value
  };
  add(item);
  (name.value = ''), name.value, (password.value = ''), (detail.value = '');
});

const read = async () => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    loadUser(data);
  } catch (err) {
    console.log(err);
  }
};

read();

const add = async item => {
  try {
    const res = await fetch(url + '/add', {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(item)
    });
    await read();
    error(await res.text());
  } catch (err) {
    console.log(err);
  }
};

function loadUser(data) {
  users.innerHTML = '';
  for (let item of data) {
    const card = document.createElement('div');
    card.classList = 'card shadow-sm col-12 col-md-5 p-0';

    const body = document.createElement('div');
    body.classList = 'card-body text-center';

    const h5 = document.createElement('h5');
    h5.classList = 'card-title fw-bold text-primary';
    h5.innerHTML = item.name;

    const p = document.createElement('p');
    p.classList = 'card-text text-muted';
    p.innerHTML = 'رمز: ' + item.password;

    const detailsBtn = document.createElement('button');
    detailsBtn.className = 'btn btn-outline-info mt-2';
    detailsBtn.innerText = 'جزئیات';
    detailsBtn.addEventListener('click', () => {
      window.location.href = `https://maleky83.github.io/controllerUsers/client/user.html?id=${item._id}`;
    });

    body.append(h5, p, detailsBtn);
    card.append(body);
    users.appendChild(card);
  }
}

const error = item => {
  const h4 = document.createElement('h4');
  h4.innerHTML = item;
  h4.classList =
    'bg-body-secondary rounded w-25 mx-auto my-2 py-2 justify-content-center d-flex';
  nav.before(h4);
  setTimeout(() => {
    h4.remove();
  }, 1000);
};

