import React from 'react'

const Breadcrumbs = () => {
  return (
    <>
        <div className='flex gap-2 text-md mt-4  font-medium'>
            <div className='opacity-60'>Dashboard</div>
            <span>{'>>'}</span>
            <div className='text-primary font-medium'>Usuário</div>
        </div>
    </>
  )
}

export default Breadcrumbs