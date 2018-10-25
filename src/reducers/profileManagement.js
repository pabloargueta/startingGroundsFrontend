export default function profileApp(state = {
  token: null,
  user: null,
  profile: null,
  horoscope: null,
  compatibleProfiles: [],
  selectedUsers: [],
  selectedProfile: null,
  bodyContent: 'TODAYS COMPATIBLE PROFILES'
}, action) {
  switch (action.type) {
    case 'LOGIN':
      localStorage.token = action.payload
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

    case 'SETCOMPATIBLEUSERS':
      return {
        ...state, compatibleProfiles: action.payload
      }

    case 'LOGOUT':
      localStorage.clear()
      return {
        ...state, token: null
      }
    case 'SETBODYCONTENT':
      return {
        ...state, bodyContent: action.payload
      }

    default:
      return state;
  }
}