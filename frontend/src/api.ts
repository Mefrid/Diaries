import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { DiaryDto, NoteDto, Diary, Note } from './types';

export const api = createApi({
  reducerPath: 'diariesReducer',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:4000' }),
  tagTypes: ['Diary', 'Note'],
  endpoints: (builder) => ({
    getDiaries: builder.query<Diary[], void>({
      query: () => '/diaries',
      providesTags: ['Diary'],
    }),
    getDiary: builder.query<Diary, Diary['_id']>({
      query: (diaryId) => `/diaries/${diaryId}`,
      providesTags: (result, error, diaryId) => [
        { type: 'Diary', id: diaryId },
      ],
    }),
    getNotesByDiaryId: builder.query<Note[], Diary['_id']>({
      query: (diaryId) => `/diaries/${diaryId}/notes`,
      providesTags: ['Note'],
    }),
    getNote: builder.query<Note, Note['_id']>({
      query: (noteId) => `/notes/${noteId}`,
      providesTags: (result, error, noteId) => [{ type: 'Note', id: noteId }],
    }),
    createDiary: builder.mutation<Diary, DiaryDto>({
      query: (body) => ({
        url: `/diaries`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Diary'],
    }),
    createNote: builder.mutation<Note, Pick<Diary, '_id'> & NoteDto>({
      query: ({ _id, ...body }) => ({
        url: `/diaries/${_id}/notes`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Note'],
    }),
    deleteDiary: builder.mutation<Diary, Diary['_id']>({
      query: (id) => ({
        url: `/diaries/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Diary'],
    }),
    deleteNote: builder.mutation<Note, Note['_id']>({
      query: (noteId) => ({
        url: `/notes/${noteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Note'],
    }),
    editNote: builder.mutation<Note, Pick<Note, '_id'> & NoteDto>({
      query: ({ _id, ...body }) => ({
        url: `/notes/${_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Note'],
    }),
    editDiary: builder.mutation<Diary, Pick<Diary, '_id'> & NoteDto>({
      query: ({ _id, ...body }) => ({
        url: `/diaries/${_id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Diary'],
    }),
  }),
});

export const {
  useGetDiariesQuery,
  useGetNotesByDiaryIdQuery,
  useGetDiaryQuery,
  useGetNoteQuery,
  useCreateDiaryMutation,
  useCreateNoteMutation,
  useDeleteDiaryMutation,
  useDeleteNoteMutation,
  useEditDiaryMutation,
  useEditNoteMutation,
} = api;
