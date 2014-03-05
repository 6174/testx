describe("Group1", function() {
   it("sample1", function() {
       expect(true).toBe(true);
   });
   it("sample2", function() {
   	   expect(2).toBe(3);
   	   console.log('I am log from client');
   });
   describe('nested suit', function(){
      it('spec3', function(){
        expect(4).toBe(4);
      });
      it('spec4', function(){
        expect(4).toBe(4);
      });
   });
    it('spec3', function(){
      expect(4).toBe(4);
    });
});

describe("Group2", function() {
	it("spec2", function() {
       expect(true).toBe(false);
   });
});