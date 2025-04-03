import Swal from "sweetalert2";

export const showSuccessAlert = (title, text) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "success",
    confirmButtonText: "Ok",
  });
};

export const showErrorAlert = (title, text) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "error",
    confirmButtonText: "Try again",
  });
};

export const showWarningAlert = (title, text, confirmText, cancelText) => {
  return Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  });
};
