import { useState } from 'react'
import SimpleForm from './components/SimpleForm'
import SimpleTable from './components/SimpleTable'

function App() {

  return (
    <div className="p-4">
      <div className='mb-4'>
        <h1 className='font-bold text-2xl text-slate-600'>Product App with React Query</h1>
      </div>
      <div className='grid grid-cols-12 gap-8'>
        <div className='col-span-4'>
          <SimpleForm />
        </div>
        <div className='col-span-8 h-[90vh] overflow-y-auto'>
          <SimpleTable />
        </div>
      </div>
    </div>
  )
}

export default App
