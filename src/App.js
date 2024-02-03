import React from 'react'
import Dice from './components/Dice'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(() => {
        const allDiceHeld = dice.every(die => die.isHeld)
        const allDiceSameValue = dice.every(die => die.value === dice[0].value)
        if (allDiceHeld && allDiceSameValue) {
            setTenzies(true)
        }
    }, [dice])

    function generateNewDice() {
        return {
            value: Math.floor(Math.random() * 6) + 1, 
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const newDice = []
        for(let i=0; i<10; i++) {
            newDice.push(generateNewDice())
        }
        return newDice
    }

    function rollDice() {
        if (!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDice()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }

    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
                return die.id === id ? {...die, isHeld: !die.isHeld} : die
            })
        )
    }

    const diceElement = dice.map(die => (
        <Dice 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
        ))

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className='title'>Tenzies</h1>
            <p className='instructions'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className='dice--container'>
                {diceElement}
            </div>
            <button 
                className='roll--dice' 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}