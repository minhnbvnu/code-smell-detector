function assertItems() {
        var itemEles = document.getElementsByTagName('li');
        expect(itemEles.length).to.be.eql(3);
        expect(itemEles[0].innerHTML).to.be.eql('item1');
        expect(itemEles[2].innerHTML).to.be.eql('item2');
    }