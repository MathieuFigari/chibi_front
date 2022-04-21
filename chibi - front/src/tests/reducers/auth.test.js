import auth, { initialState } from '../../reducers/auth';
import { connectUser } from '../../actions/auth';

describe('Reducers / Auth', () => {
  describe('Structure', () => {
    test('it is a function', () => {
      expect(typeof auth).toBe('function');
    });
  });

  describe('Execution', () => {
    test('it returns an object', () => {
      expect(typeof auth()).toBe('object');
    });

    test('it is correctly initialized', () => {
      // quand on utilise toBe pour comparer 2 objet, on vérifie qu'il s'agit
      // du MEME objet
      // quand on utilise toEqual, on réalise une comparaison en profondeur
      expect(auth()).toEqual(initialState);

      const expectedInitialState = {
        isLoggedIn: false, 
        user: null, 
        userAddresses: null, 
        token: null, 
        orders: null 
      };

      expect(auth()).toEqual(expectedInitialState);

    });

    // pour tester que l'action CONNECT_USER est bien gérée,
    // on va appeler notre reducer en lui passant en argument une action de type CONNECT_USER
    // et en vérifiant que le résultat obtenu est bien celui attendu
    test('it handle correctly CONNECT_USER action', () => {
      
      // Les données en entrée
        const fakeUser = {
            token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoidGVzdEB0ZXN0LmZyIiwiaWF0IjoxNjM4NDY5Mjk3LCJleHAiOjE2MzkwNjkyOTd9.yNyIrnmvqAGKWDa6USVjLpcZq7AfgcrnxyQBiJohNMs",
            user: {
                birthday_date: "1980-11-30",
                first_name: "André",
                gender: false,
                id: 28,
                last_name: "Dupont",
                mail: "test@test.fr",
                phone_number: "0612345678",
                principal_city: "paris",
                principal_name_of_the_road: "rue emile",
                principal_postal_code: "75000",
                principal_street_number: "1"
            }
        }

      // on prépare l'action à passer au reducer grâce à l'action creator
      const connectUserAction = connectUser(fakeUser);

      // Les données initiales
      const stateBefore = {
        isLoggedIn: false, 
        user: null, 
        userAddresses: null, 
        token: null, 
        orders: null 
      };

      // Les données attendues
      const expectedStateAfter = {
        user: expect.objectContaining(fakeUser.user),
        isLoggedIn: true,
        token: expect.stringMatching(fakeUser.token),
        userAddresses: null, 
        orders: null 
      };      
      
      // c'est ce que l'on vérifie en exécutant le reducer en lui passant state avant
      // et l'action
      expect(auth(stateBefore, connectUserAction)).toMatchObject(expectedStateAfter);

    });

  });
});