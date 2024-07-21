Dropzone.options.myAwesomeDropzone = {
  maxFilesize: 2,
  accept: function (file, done) {
    if (file.previewElement) {
      file.previewElement.classList.remove('dz-file-preview');
      var images = file.previewElement.querySelectorAll('[data-dz-thumbnail]');
      for (var i = 0; i < images.length; i++) {
        var thumbnailElement = images[i];
        thumbnailElement.alt = file.name;
      }
      setTimeout(function () {
        file.previewElement.classList.add('dz-image-preview');
      }, 1);
    }

    done();
  },
  addedfiles(files) {
    if (this.files.length > 1) {
      files.map((file) => {
        this.removeFile(file);
      });
    }
  },
  success(file) {
    if (file.previewElement) {
      hideProgress();
      return file.previewElement.classList.add('dz-success');
    }
  },
  uploadprogress(file, progress, bytesSent) {
    const progressbar = document.querySelector('.progress');
    progressbar.style.width = 0;
    progressbar.style.opacity = 1;
    progressbar.classList.remove('progress_blink');
    let per = 0;
    if (progress >= 100) {
      per = Number.parseFloat(progress).toFixed(0) * 0.16;
      progressbar.style.width = per + 'rem';
      progressbar.classList.add('progress_blink');
      uploadProfilePicture(file);
    } else {
      per = Number.parseFloat(progress).toFixed(0) * 0.16;
      progressbar.style.width = per + 'rem';
    }

    if (file.previewElement) {
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;
      try {
        for (
          var _iterator8 = file.previewElement
              .querySelectorAll('[data-dz-uploadprogress]')
              [Symbol.iterator](),
            _step8;
          !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done);
          _iteratorNormalCompletion8 = true
        ) {
          var node = _step8.value;
          node.nodeName === 'PROGRESS'
            ? (node.value = progress)
            : (node.style.width = ''.concat(progress, '%'));
        }
      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8['return'] != null) {
            _iterator8['return']();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }
    }
  },
};
function hideProgress() {
  const progressbar = document.querySelector('.progress');
  let count = 3;
  const hiding = setInterval(hide, 60);
  function hide() {
    if (count > 0) {
      count -= 0.08;
      progressbar.style.opacity = count;
    }
  }
}

function removeBlink() {
  const progressbar = document.querySelector('.progress');
  progressbar.classList.remove('progress_blink');
}
