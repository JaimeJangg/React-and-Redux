import { createStore } from 'redux';

const $form = document.getElementById('form');
$form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData($form);
    const title = data.get('title')
    console.log(title);
    //Action
    store.dispatch({
        type: 'ADD_SONG',
        payload: {
            title,
        }
    })
}

const initialState = [
    {
        'title': 'despacito',
    },
    {
        'title': 'One more time',
    },
    {
        'title': 'Echame la culpa',
    }
]

//reducer
const reducer = function(state, action) {
    switch (action.type) {
        case 'ADD_SONG':
            return [...state, action.payload]
        default:
            return state
    }
}

//  STORE
const store = createStore(
    /*reducer*/ reducer,
                initialState,
/*enhancer*/    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

function render() {
    const $container = document.getElementById('playlist');
    const playlist = store.getState();
    $container.innerHTML = ''; //para agregar solo la cancion 
    playlist.forEach((item) => {
        const template = document.createElement('p');
        template.textContent = item.title;
        $container.appendChild(template);
})
}
render();

function handleChange() {
    render();
}

store.subscribe(handleChange)

//console.log(store.getState())

