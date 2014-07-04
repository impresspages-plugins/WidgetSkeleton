<?php
/**
 * Public representation of the widget.
 * All form data is available here in form of variables.
 * Please check the existence of all variables as at the beginning widget has no data.
 */
?>
<div>
    Title: <?php echo esc(!empty($title) ? $title : '') ?>
</div>
<div>
    Text: <?php echo !empty($text) ? $text : '' ?>
</div>

