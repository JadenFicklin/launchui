import { faker } from '@faker-js/faker'

export type Person = {
  firstName: string
  lastName: string
  age: number
  taken: boolean
  date: Date
}

const newPerson = (): Person => ({
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  age: faker.number.int({ min: 18, max: 80 }),
  taken: faker.datatype.boolean(),
  date: faker.date.between({ from: '1960', to: '2024' }),
})

export const makeData = (...lens: number[]): Person[] => {
  return lens.flatMap((len) => Array.from({ length: len }, newPerson))
}
