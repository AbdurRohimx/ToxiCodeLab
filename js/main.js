
(function() {

	var viewEl = document.querySelector('.view'),
		gridEl = viewEl.querySelector('.grid'),
		items = [].slice.call(gridEl.querySelectorAll('.product')),
		basket;

	// the compare basket
	function CompareBasket() {
		this.el = document.querySelector('.compare-basket');
		this.compareCtrl = this.el.querySelector('.action--compare');
		this.compareWrapper = document.querySelector('.compare'),
		this.closeCompareCtrl = this.compareWrapper.querySelector('.action--close')
		
		this.itemsAllowed = 3;
		this.totalItems = 0;
		this.items = [];

		// compares items in the compare basket: opens the compare products wrapper
		this.compareCtrl.addEventListener('click', this._compareItems.bind(this));
		// close the compare products wrapper
		var self = this;
		this.closeCompareCtrl.addEventListener('click', function() {
			// toggle compare basket
			classie.add(self.el, 'compare-basket--active');
			// animate..
			classie.remove(viewEl, 'view--compare');
		});
	}



	// Get the button and the popup elements
var errorButton = document.getElementById('downloadBtn3');
var errorPopup = document.getElementById('errorPopup');
var closeBtn = document.querySelector('.close');

// When the user clicks the button, show the popup
errorButton.onclick = function() {
    errorPopup.style.display = 'block';
}

// When the user clicks on the close button, hide the popup
closeBtn.onclick = function() {
    errorPopup.style.display = 'none';
}

// When the user clicks anywhere outside the popup, hide it
window.onclick = function(event) {
    if (event.target == errorPopup) {
        errorPopup.style.display = 'none';
    }
}
















// 	// script.js
// document.getElementById('downloadBtn').addEventListener('click', function() {
//     // Specify the URL of the file to be downloaded
//     const fileUrl = "https://abdurrohimx.github.io/Free-Fire-All-Version-/"; // Replace with the actual file URL

//     // Create a link element
//     const downloadLink = document.createElement("a");

//     // Set the download attribute with a filename (optional)
//     downloadLink.download = "app.zip"; // You can change the filename here

//     // Set the href to the file URL
//     downloadLink.href = fileUrl;

//     // Programmatically click the link to trigger the download
//     downloadLink.click();
// });

// document.getElementById('downloadBtn1').addEventListener('click', function() {
//     // Specify the URL of the file to be downloaded
//     const fileUrl = "https://fdrive.cloud/drive/s/loTADLhQBOrXpagVedKmlbOJMVV1fD"; // Replace with the actual file URL

//     // Create a link element
//     const downloadLink = document.createElement("a");

//     // Set the download attribute with a filename (optional)
//     downloadLink.download = "app.zip"; // You can change the filename here

//     // Set the href to the file URL
//     downloadLink.href = fileUrl;

//     // Programmatically click the link to trigger the download
//     downloadLink.click();
// });

// document.getElementById('downloadBtn2').addEventListener('click', function() {
//     // Specify the URL of the file to be downloaded
//     const fileUrl = "https://fdrive.cloud/drive/s/a95KPX64b3LBmWho86jyIdd2LoEGN2"; // Replace with the actual file URL

//     // Create a link element
//     const downloadLink = document.createElement("a");

//     // Set the download attribute with a filename (optional)
//     downloadLink.download = "app.zip"; // You can change the filename here

//     // Set the href to the file URL
//     downloadLink.href = fileUrl;

//     // Programmatically click the link to trigger the download
//     downloadLink.click();
// });

// document.getElementById('downloadBtn3').addEventListener('click', function() {
//     // Specify the URL of the file to be downloaded
//     const fileUrl = "x"; // Replace with the actual file URL

//     // Create a link element
//     const downloadLink = document.createElement("a");

//     // Set the download attribute with a filename (optional)
//     downloadLink.download = "app.zip"; // You can change the filename here

//     // Set the href to the file URL
//     downloadLink.href = fileUrl;

//     // Programmatically click the link to trigger the download
//     downloadLink.click();
// });

// document.getElementById('downloadBtn4').addEventListener('click', function() {
//     // Specify the URL of the file to be downloaded
//     const fileUrl = "https://fdrive.cloud/drive/s/rGbUHC8V8XgvPpHyLwOxAlr4rIk8lF"; // Replace with the actual file URL

//     // Create a link element
//     const downloadLink = document.createElement("a");

//     // Set the download attribute with a filename (optional)
//     downloadLink.download = "app.zip"; // You can change the filename here

//     // Set the href to the file URL
//     downloadLink.href = fileUrl;

//     // Programmatically click the link to trigger the download
//     downloadLink.click();
// });

// document.getElementById('downloadBtn5').addEventListener('click', function() {
//     // Specify the URL of the file to be downloaded
//     const fileUrl = "https://fdrive.cloud/drive/s/s9tt4z47ZoXJO1hEjeV0p9v81mVfjH"; // Replace with the actual file URL

//     // Create a link element
//     const downloadLink = document.createElement("a");

//     // Set the download attribute with a filename (optional)
//     downloadLink.download = "app.zip"; // You can change the filename here

//     // Set the href to the file URL
//     downloadLink.href = fileUrl;

//     // Programmatically click the link to trigger the download
//     downloadLink.click();
// });


	CompareBasket.prototype.add = function(item) {
		// check limit
		if( this.isFull() ) {
			return false;
		}

		classie.add(item, 'product--selected');

		// create item preview element
		var preview = this._createItemPreview(item);
		// prepend it to the basket
		this.el.insertBefore(preview, this.el.childNodes[0]);
		// insert item
		this.items.push(preview);

		this.totalItems++;
		if( this.isFull() ) {
			classie.add(this.el, 'compare-basket--full');
		}

		classie.add(this.el, 'compare-basket--active');
	};

	CompareBasket.prototype._createItemPreview = function(item) {
		var self = this;

		var preview = document.createElement('div');
		preview.className = 'product-icon';
		preview.setAttribute('data-idx', items.indexOf(item));
		
		var removeCtrl = document.createElement('button');
		removeCtrl.className = 'action action--remove';
		removeCtrl.innerHTML = '<i class="fa fa-remove"></i><span class="action__text action__text--invisible">Remove product</span>';
		removeCtrl.addEventListener('click', function() {
			self.remove(item);
		});
		
		var productImageEl = item.querySelector('img.product__image').cloneNode(true);

		preview.appendChild(productImageEl);
		preview.appendChild(removeCtrl);

		var productInfo = item.querySelector('.product__info').innerHTML;
		preview.setAttribute('data-info', productInfo);

		return preview;
	};

	CompareBasket.prototype.remove = function(item) {
		classie.remove(this.el, 'compare-basket--full');
		classie.remove(item, 'product--selected');
		var preview = this.el.querySelector('[data-idx = "' + items.indexOf(item) + '"]');
		this.el.removeChild(preview);
		this.totalItems--;

		var indexRemove = this.items.indexOf(preview);
		this.items.splice(indexRemove, 1);

		if( this.totalItems === 0 ) {
			classie.remove(this.el, 'compare-basket--active');
		}

		// checkbox
		var checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
		if( checkbox.checked ) {
			checkbox.checked = false;
		}
	};

	CompareBasket.prototype._compareItems = function() {
		var self = this;

		// remove all previous items inside the compareWrapper element
		[].slice.call(this.compareWrapper.querySelectorAll('div.compare__item')).forEach(function(item) {
			self.compareWrapper.removeChild(item);
		});

		for(var i = 0; i < this.totalItems; ++i) {
			var compareItemWrapper = document.createElement('div');
			compareItemWrapper.className = 'compare__item';

			var compareItemEffectEl = document.createElement('div');
			compareItemEffectEl.className = 'compare__effect';

			compareItemEffectEl.innerHTML = this.items[i].getAttribute('data-info');
			compareItemWrapper.appendChild(compareItemEffectEl);

			this.compareWrapper.insertBefore(compareItemWrapper, this.compareWrapper.childNodes[0]);
		}

		setTimeout(function() {
			// toggle compare basket
			classie.remove(self.el, 'compare-basket--active');
			// animate..
			classie.add(viewEl, 'view--compare');
		}, 25);
	};

	CompareBasket.prototype.isFull = function() {
		return this.totalItems === this.itemsAllowed;
	};

	function init() {
		// initialize an empty basket
		basket = new CompareBasket();
		initEvents();
	}

	function initEvents() {
		items.forEach(function(item) {
			var checkbox = item.querySelector('.action--compare-add > input[type = "checkbox"]');
			checkbox.checked = false;

			// ctrl to add to the "compare basket"
			checkbox.addEventListener('click', function(ev) {
				if( ev.target.checked ) {
					if( basket.isFull() ) {
						ev.preventDefault();
						return false;
					}
					basket.add(item);
				}
				else {
					basket.remove(item);
				}
			});
		});
	}

	init();

})();