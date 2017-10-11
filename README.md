# NOTIFY
Simple (6.5kb code) and pretty JavaScript alert notifier. Replace standart alert window. 

Version: 0.0.1.

Dependencies: jquery.

**How to begin:**

First connect ccs, js & images into your html page.

```
notify.show
({
	title: "Test",
	body: "Hello world!"
});
```

## API

**notify.show(options)**

Options are object with next options:
1. delay - delay in ms. before the notify window is shown.
2. showCancelButton - true or false (default).
3. showConfirmButton - true (default) or false.
4. showUserFnButton - true or false (default).
5. type - "error", "warning", "confirm", "notify" (default).
6. title - title (header) for notify window.
7. body - notify message text.
8. input - show or hide (default) input field on notify window. Input value is transferred to buttons functions.
9. inputPlaceholder - placeholder for input field.
10. confirmButtonText - Text for confirm button. Default is "OK".
11. cancelButtonText  - Text for cancel button. Default is "ОТМЕНА".
12. userButtonText - Text for user button. Default is "".
13. confirmFunction - This function will run after click on confirm button.
14. cancelFunction  - This function will run after click on confirm button.
15. userFunction - This function will run after click on confirm button.
16. closeOnConfirm - true (default) or false. Use this option for ajax or other request, when you need delay. Next notify window will replace this window.

**notify.close()**

Just closes notify window if you need.

![notify.js](http://www.imageup.ru/img232/2885861/notify.jpg)
