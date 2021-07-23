import React from 'react'
import style from './app.less'
import Test from '@/components/Test'

const App:React.FC<any> = () => {
  return (
    <div className={style.app}>
      <Test name='jack1111' age={24}/>
    </div>
  )
}

export default App
