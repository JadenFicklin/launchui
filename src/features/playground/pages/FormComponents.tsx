import { Button } from '~/components/Button'
import { Checkbox } from '~/components/Checkbox'
import { Input } from '~/components/Input'
import { RadioButtons } from '~/components/RadioButtons'
import { Dropdown } from '~/components/Dropdown'
import { Textarea } from '~/components/Textarea'
import { Switch } from '~/components/Switch'
import { RangedSlider } from '~/components/RangedSlider'
import { Slider } from '~/components/Slider'
import { DatePicker } from '~/components/DatePicker'

export const FormComponents: React.FC = () => {
  return (
    <form className='mb-16 flex flex-col items-start gap-12'>
      <h2 className='text-3xl'>Forms</h2>
      <div className='flex w-96 flex-col gap-8'>
        <span className='text-lg font-medium text-script'>Inputs</span>
        <Input
          label='Input'
          id='input'
          type='email'
          placeholder='Placeholder text'
        />
        <Textarea
          label='Textarea'
          id='textarea'
          rows={5}
          placeholder='Placeholder text'
        />
        <DatePicker />
      </div>

      <div className='flex w-96 flex-col gap-8'>
        <span className='text-lg font-medium text-script'>Sliders</span>
        <Slider min={0} max={100} defaultValue={10} label='Slider:' />
        <RangedSlider
          min={0}
          max={100}
          defaultMin={10}
          defaultMax={50}
          label='Ranged slider:'
        />
      </div>

      <div className='flex w-96 flex-col gap-8'>
        <span className='text-lg font-medium text-script'>Toggleables</span>
        <Checkbox label='Checkbox' id='checkbox' defaultChecked={true} />
        <Switch
          label='Toggle Switch'
          defaultChecked={true}
          name='toggle-switch'
        />
      </div>

      <div className='flex w-96 flex-col gap-8'>
        <span className='text-lg font-medium text-script'>Selects</span>
        <Dropdown label='Dropdown' options={dropdownOptions} name='dropdown' />
        <RadioButtons
          name='notification-method'
          options={radioButtonOptions}
          defaultChecked='Email'
        />
      </div>

      <div className='flex w-96 flex-col items-start gap-8'>
        <span className='text-lg font-medium text-script'>Buttons</span>
        <Button type='submit'>Submit</Button>
      </div>
    </form>
  )
}

const radioButtonOptions = ['Email', 'Phone (SMS)', 'Push notification']

const dropdownOptions = [
  { label: 'Wade Cooper' },
  { label: 'Arlene Mccoy' },
  { label: 'Devon Webb' },
  { label: 'Tom Cook' },
  { label: 'Tanya Fox' },
  { label: 'Hellen Schmidt' },
  { label: 'Caroline Schultz' },
  { label: 'Mason Heaney' },
  { label: 'Claudie Smitham' },
  { label: 'Emil Schaefer' },
]
