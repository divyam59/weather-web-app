// console.log('client side js file loaded');
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//   response.json().then((data)=>{
//     console.log(data);
//   })
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messone = document.querySelector('#message-1')
const messtwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const location = search.value;
  messone.textContent='Loading..';
  messtwo.textContent='';
    fetch('http://localhost:3000/weather?address='+encodeURIComponent(location)).then((response)=>{
    response.json().then((data)=>{
      if(data.error)
      messone.textContent=data.error
      else
      {
        messone.textContent=data.location
        messtwo.textContent= data.forecast
      }
    })
    })

})