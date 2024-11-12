import './App.css'
import Card from './components/Card/Card'

function App() {


  return (
    <>
      <Card
        button1Text='btn1'
        button2Text='btn2'
        onAction1={() => alert(1)}
        onAction2={() => alert(2)}
        text='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus.'
        title='Lorem ipsum dolor'
        imageUrl='https://rickandmortyapi.com/api/character/avatar/656.jpeg'
      />
    </>
  )
}

export default App
