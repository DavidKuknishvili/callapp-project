import create from "zustand";
import { Person } from "./App";

interface PersonState {
  persons: Person[];
  selectedPerson: Person | null;

  savePersons: (persons: Person[]) => void;
  addPerson: (person: Person) => void;
  editPerson: (person: Person) => void;
  deletePerson: (id: number) => void;
  selectPerson: (id: number) => void;
}

export const usePersonStore = create<PersonState>((set) => ({
  persons: [],
  selectedPerson: null,
  savePersons: (persons: Person[]) => set((state) => ({ persons: persons })),
  addPerson: (person: Person) =>
    set((state) => ({ persons: [...state.persons, person] })),
  editPerson: (person: Person) =>
    set((state) => ({
      persons: state.persons.map((p) => (p.id === person.id ? person : p)),
    })),
  deletePerson: (id: number) =>
    set((state) => ({
      persons: state.persons.filter((p) => p.id !== id),
      selectedPerson:
        state.selectedPerson?.id === id ? null : state.selectedPerson,
    })),
  selectPerson: (id: number) =>
    set((state) => ({
      selectedPerson: state.persons.find((p) => p.id === id) ?? null,
    })),
}));
