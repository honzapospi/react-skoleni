var Dog = function () {
    this.items = [1,'dve',3,'ctyri'];
    this.prefix = 'Cislo: ';
}

Dog.prototype.printItems = function () {
    var self = this;
    this.items.map(function (item) {
        console.log(self.prefix + item);
    });
}

Dog.prototype.printItems2 = function () {
    this.items.map((item) => {
        console.log(this.prefix + item);
    });
}


var pes = new Dog();
pes.printItems();
pes.printItems2();