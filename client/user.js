const url = 'https://controllerusers.onrender.com/users';
const card = document.querySelector('#card');

const nav = document.querySelector('#nav');
const param = new URLSearchParams(window.location.search);
const id = param.get('id');
console.log(id,param)

const form = document.querySelector('#form');
const sub = document.querySelector('#form button');
const newName = document.querySelector('#nameN');
const newPass = document.querySelector('#passwordN');
const newDetail = document.querySelector('#detailN');

const readUser = async () => {
  try {
    const res = await fetch(`${url}/${id}`);
    const data = await res.json();
    await showUser(data);
  } catch (err) {
    console.log(err);
  }
};

readUser();

const deleteUser = async id => {
  try {
    const res = await fetch(url + '/delete', {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ id })
    });
  } catch (err) {
    console.log(err);
  }
};

const editUser = async (id, newItem) => {
  try {
    const res = await fetch(url + '/' + id, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newItem)
    });
    error(await res.text());
  } catch (err) {
    console.log(err);
  }
};

function showUser(data) {
  const h3 = document.querySelector('#nav div div h3');
  h3.innerHTML = data.name;
  const p = document.querySelector('#nav div div p');
  p.innerHTML = `رمز: ${data.password}`;
  const detail = document.querySelector('#detail');
  detail.innerHTML = data.detail;
  const deleteU = document.querySelector('#nav div div #delete');

  deleteU.innerText = 'حذف';
  const edite = document.querySelector('#nav div div #edite');
  edite.innerText = 'ویرایش';

  deleteU.addEventListener('click', () => {
    deleteUser(data._id);
    window.location.pathname = url;
  });

  edite.addEventListener('click',() => {
    card.classList.add('d-none');
    showEditUser(data);
  });
}

sub.addEventListener('click', async e => {
  e.preventDefault();
  card.classList.remove('d-none');
  form.classList.add('d-none');
  await editUser(id, {
    name: newName.value,
    password: newPass.value,
    detail: newDetail.value
  });
  await readUser();
});

const showEditUser = data => {
  newName.value = data.name;
  newPass.value = data.password;
  newDetail.value = data.detail;
  form.classList.remove('d-none');
};

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
