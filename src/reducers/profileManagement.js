export default function profileApp(state = {
  token: null,
  user: null,
  profile: null,
  horoscope: null,
  compatibleProfiles: [],
  selectedUsers: [],
  selectedProfile: null,
}, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state, token: action.payload
      }

    case 'SETUSER':
      return {
        ...state, user: action.payload, profile: action.payload.profile
      }

    case 'SETAVATARURL':
      return {
        ...state, user: { ...state.user, avatar_url: action.payload }
      }

    case 'SETHOROSCOPE':
      return {
        ...state, horoscope: action.payload
      }



    default:
      return state;
  }
}