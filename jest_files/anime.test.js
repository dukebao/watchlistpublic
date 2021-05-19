//Anime//
const add_anime = require('../sqlite_anime').add_anime;
const remove_anime = require('../sqlite_anime').remove_anime;


test('Adds anime, fail case', () => {
    expect(add_anime('Yahari Ore no Seishun Love Comedy wa Machigatteiru', 'test', 'test')).toBeNull();
});

test('Adds anime, pass case', () => {
    expect(add_anime('Zoruto', 'test', 'test')).toBe('Anime added successfully');
});

test('removes anime. pass case.', () => {
    expect(remove_anime(51)).toBe('Anime removed.');
});

test('removes anime. fail case.', () => {
    expect(remove_anime(51)).toBeNull();
});
