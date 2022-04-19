import { memo } from 'react'
import { useFormRegister } from '../hooks/useFormRegister.js'
export const AppFilter = memo((props) => {
  const [register] = useFormRegister(
    { term: '' },
    props.setFilter
  )

  return (
    <section className="app-filter">
      <input type="text" {...register('term')} />
    </section>
  )
})
