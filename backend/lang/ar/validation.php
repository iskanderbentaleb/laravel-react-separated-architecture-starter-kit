<?php

return [

    /*
    |--------------------------------------------------------------------------
    | أسطر لغة التحقق من الصحة
    |--------------------------------------------------------------------------
    |
    | تحتوي أسطر اللغة التالية على رسائل الخطأ الافتراضية المستخدمة من قبل
    | فئة التحقق من الصحة. بعض هذه القواعد لها عدة إصدارات مثل
    | قواعد الحجم. لا تتردد في تعديل كل من هذه الرسائل هنا.
    |
    */

    'accepted' => 'يجب قبول الحقل :attribute.',
    'accepted_if' => 'يجب قبول الحقل :attribute عندما يكون :other هو :value.',
    'active_url' => 'يجب أن يكون الحقل :attribute عنوان URL صالحاً.',
    'after' => 'يجب أن يكون الحقل :attribute تاريخاً بعد :date.',
    'after_or_equal' => 'يجب أن يكون الحقل :attribute تاريخاً بعد أو يساوي :date.',
    'alpha' => 'يجب أن يحتوي الحقل :attribute على أحرف فقط.',
    'alpha_dash' => 'يجب أن يحتوي الحقل :attribute على أحرف وأرقام وشرطات وشرطات سفلية فقط.',
    'alpha_num' => 'يجب أن يحتوي الحقل :attribute على أحرف وأرقام فقط.',
    'array' => 'يجب أن يكون الحقل :attribute مصفوفة.',
    'ascii' => 'يجب أن يحتوي الحقل :attribute على أحرف أبجدية رقمية ورموز أحادية البايت فقط.',
    'before' => 'يجب أن يكون الحقل :attribute تاريخاً قبل :date.',
    'before_or_equal' => 'يجب أن يكون الحقل :attribute تاريخاً قبل أو يساوي :date.',
    'between' => [
        'array' => 'يجب أن يحتوي الحقل :attribute على عدد من العناصر بين :min و :max.',
        'file' => 'يجب أن يكون حجم الحقل :attribute بين :min و :max كيلوبايت.',
        'numeric' => 'يجب أن تكون قيمة الحقل :attribute بين :min و :max.',
        'string' => 'يجب أن يكون عدد محارف الحقل :attribute بين :min و :max.',
    ],
    'boolean' => 'يجب أن يكون الحقل :attribute صحيحاً أو خاطئاً.',
    'can' => 'يحتوي الحقل :attribute على قيمة غير مسموح بها.',
    'confirmed' => 'تأكيد الحقل :attribute غير متطابق.',
    'contains' => 'الحقل :attribute يفتقد قيمة مطلوبة.',
    'current_password' => 'كلمة المرور غير صحيحة.',
    'date' => 'يجب أن يكون الحقل :attribute تاريخاً صالحاً.',
    'date_equals' => 'يجب أن يكون الحقل :attribute تاريخاً مساوياً لـ :date.',
    'date_format' => 'يجب أن يتطابق الحقل :attribute مع التنسيق :format.',
    'decimal' => 'يجب أن يحتوي الحقل :attribute على :decimal منازل عشرية.',
    'declined' => 'يجب رفض الحقل :attribute.',
    'declined_if' => 'يجب رفض الحقل :attribute عندما يكون :other هو :value.',
    'different' => 'يجب أن يختلف الحقل :attribute عن الحقل :other.',
    'digits' => 'يجب أن يحتوي الحقل :attribute على :digits أرقام.',
    'digits_between' => 'يجب أن يحتوي الحقل :attribute على عدد أرقام بين :min و :max.',
    'dimensions' => 'الحقل :attribute يحتوي على أبعاد صورة غير صالحة.',
    'distinct' => 'الحقل :attribute يحتوي على قيمة مكررة.',
    'doesnt_end_with' => 'لا يجب أن ينتهي الحقل :attribute بأي من القيم التالية: :values.',
    'doesnt_start_with' => 'لا يجب أن يبدأ الحقل :attribute بأي من القيم التالية: :values.',
    'email' => 'يجب أن يكون الحقل :attribute عنوان بريد إلكتروني صالحاً.',
    'ends_with' => 'يجب أن ينتهي الحقل :attribute بأحد القيم التالية: :values.',
    'enum' => 'القيمة المحددة في الحقل :attribute غير صالحة.',
    'exists' => 'القيمة المحددة في الحقل :attribute غير صالحة.',
    'extensions' => 'يجب أن يكون للحقل :attribute أحد الامتدادات التالية: :values.',
    'file' => 'يجب أن يكون الحقل :attribute ملفاً.',
    'filled' => 'يجب أن يحتوي الحقل :attribute على قيمة.',
    'gt' => [
        'array' => 'يجب أن يحتوي الحقل :attribute على أكثر من :value عنصر.',
        'file' => 'يجب أن يكون حجم الحقل :attribute أكبر من :value كيلوبايت.',
        'numeric' => 'يجب أن تكون قيمة الحقل :attribute أكبر من :value.',
        'string' => 'يجب أن يكون عدد محارف الحقل :attribute أكبر من :value.',
    ],
    'gte' => [
        'array' => 'يجب أن يحتوي الحقل :attribute على :value عنصر أو أكثر.',
        'file' => 'يجب أن يكون حجم الحقل :attribute أكبر من أو يساوي :value كيلوبايت.',
        'numeric' => 'يجب أن تكون قيمة الحقل :attribute أكبر من أو تساوي :value.',
        'string' => 'يجب أن يكون عدد محارف الحقل :attribute أكبر من أو يساوي :value.',
    ],
    'hex_color' => 'يجب أن يكون الحقل :attribute لوناً سداسياً عشرياً صالحاً.',
    'image' => 'يجب أن يكون الحقل :attribute صورة.',
    'in' => 'القيمة المحددة في الحقل :attribute غير صالحة.',
    'in_array' => 'يجب أن يكون الحقل :attribute موجوداً في :other.',
    'integer' => 'يجب أن يكون الحقل :attribute عدداً صحيحاً.',
    'ip' => 'يجب أن يكون الحقل :attribute عنوان IP صالحاً.',
    'ipv4' => 'يجب أن يكون الحقل :attribute عنوان IPv4 صالحاً.',
    'ipv6' => 'يجب أن يكون الحقل :attribute عنوان IPv6 صالحاً.',
    'json' => 'يجب أن يكون الحقل :attribute سلسلة JSON صالحة.',
    'list' => 'يجب أن يكون الحقل :attribute قائمة.',
    'lowercase' => 'يجب أن يكون الحقل :attribute بأحرف صغيرة.',
    'lt' => [
        'array' => 'يجب أن يحتوي الحقل :attribute على أقل من :value عنصر.',
        'file' => 'يجب أن يكون حجم الحقل :attribute أصغر من :value كيلوبايت.',
        'numeric' => 'يجب أن تكون قيمة الحقل :attribute أصغر من :value.',
        'string' => 'يجب أن يكون عدد محارف الحقل :attribute أصغر من :value.',
    ],
    'lte' => [
        'array' => 'يجب ألا يحتوي الحقل :attribute على أكثر من :value عنصر.',
        'file' => 'يجب أن يكون حجم الحقل :attribute أصغر من أو يساوي :value كيلوبايت.',
        'numeric' => 'يجب أن تكون قيمة الحقل :attribute أصغر من أو تساوي :value.',
        'string' => 'يجب أن يكون عدد محارف الحقل :attribute أصغر من أو يساوي :value.',
    ],
    'mac_address' => 'يجب أن يكون الحقل :attribute عنوان MAC صالحاً.',
    'max' => [
        'array' => 'يجب ألا يحتوي الحقل :attribute على أكثر من :max عنصر.',
        'file' => 'يجب ألا يتجاوز حجم الحقل :attribute :max كيلوبايت.',
        'numeric' => 'يجب ألا تتجاوز قيمة الحقل :attribute :max.',
        'string' => 'يجب ألا يتجاوز عدد محارف الحقل :attribute :max محرفاً.',
    ],
    'max_digits' => 'يجب ألا يحتوي الحقل :attribute على أكثر من :max رقماً.',
    'mimes' => 'يجب أن يكون الحقل :attribute ملفاً من النوع: :values.',
    'mimetypes' => 'يجب أن يكون الحقل :attribute ملفاً من النوع: :values.',
    'min' => [
        'array' => 'يجب أن يحتوي الحقل :attribute على الأقل :min عنصر.',
        'file' => 'يجب أن يكون حجم الحقل :attribute على الأقل :min كيلوبايت.',
        'numeric' => 'يجب أن تكون قيمة الحقل :attribute على الأقل :min.',
        'string' => 'يجب أن يكون عدد محارف الحقل :attribute على الأقل :min محرفاً.',
    ],
    'min_digits' => 'يجب أن يحتوي الحقل :attribute على الأقل :min رقماً.',
    'missing' => 'يجب أن يكون الحقل :attribute مفقوداً.',
    'missing_if' => 'يجب أن يكون الحقل :attribute مفقوداً عندما يكون :other هو :value.',
    'missing_unless' => 'يجب أن يكون الحقل :attribute مفقوداً ما لم يكن :other هو :value.',
    'missing_with' => 'يجب أن يكون الحقل :attribute مفقوداً عند وجود :values.',
    'missing_with_all' => 'يجب أن يكون الحقل :attribute مفقوداً عند وجود :values.',
    'multiple_of' => 'يجب أن يكون الحقل :attribute مضاعفاً للقيمة :value.',
    'not_in' => 'القيمة المحددة في الحقل :attribute غير صالحة.',
    'not_regex' => 'تنسيق الحقل :attribute غير صالح.',
    'numeric' => 'يجب أن يكون الحقل :attribute رقماً.',
    'password' => [
        'letters' => 'يجب أن يحتوي الحقل :attribute على حرف واحد على الأقل.',
        'mixed' => 'يجب أن يحتوي الحقل :attribute على حرف كبير وحرف صغير واحد على الأقل.',
        'numbers' => 'يجب أن يحتوي الحقل :attribute على رقم واحد على الأقل.',
        'symbols' => 'يجب أن يحتوي الحقل :attribute على رمز واحد على الأقل.',
        'uncompromised' => 'قيمة :attribute المدخلة موجودة في تسريب بيانات. يرجى اختيار :attribute آخر.',
    ],
    'present' => 'يجب أن يكون الحقل :attribute موجوداً.',
    'present_if' => 'يجب أن يكون الحقل :attribute موجوداً عندما يكون :other هو :value.',
    'present_unless' => 'يجب أن يكون الحقل :attribute موجوداً ما لم يكن :other هو :value.',
    'present_with' => 'يجب أن يكون الحقل :attribute موجوداً عند وجود :values.',
    'present_with_all' => 'يجب أن يكون الحقل :attribute موجوداً عند وجود :values.',
    'prohibited' => 'الحقل :attribute محظور.',
    'prohibited_if' => 'الحقل :attribute محظور عندما يكون :other هو :value.',
    'prohibited_unless' => 'الحقل :attribute محظور ما لم يكن :other موجوداً في :values.',
    'prohibits' => 'الحقل :attribute يمنع وجود :other.',
    'regex' => 'تنسيق الحقل :attribute غير صالح.',
    'required' => 'الحقل :attribute إلزامي.',
    'required_array_keys' => 'يجب أن يحتوي الحقل :attribute على مدخلات لـ :values.',
    'required_if' => 'الحقل :attribute إلزامي عندما يكون :other هو :value.',
    'required_if_accepted' => 'الحقل :attribute إلزامي عندما يكون :other مقبولاً.',
    'required_if_declined' => 'الحقل :attribute إلزامي عندما يكون :other مرفوضاً.',
    'required_unless' => 'الحقل :attribute إلزامي ما لم يكن :other موجوداً في :values.',
    'required_with' => 'الحقل :attribute إلزامي عند وجود :values.',
    'required_with_all' => 'الحقل :attribute إلزامي عند وجود :values.',
    'required_without' => 'الحقل :attribute إلزامي عند عدم وجود :values.',
    'required_without_all' => 'الحقل :attribute إلزامي عند عدم وجود أي من :values.',
    'same' => 'يجب أن يتطابق الحقل :attribute مع :other.',
    'size' => [
        'array' => 'يجب أن يحتوي الحقل :attribute على :size عنصر.',
        'file' => 'يجب أن يكون حجم الحقل :attribute :size كيلوبايت.',
        'numeric' => 'يجب أن تكون قيمة الحقل :attribute :size.',
        'string' => 'يجب أن يكون عدد محارف الحقل :attribute :size محرفاً.',
    ],
    'starts_with' => 'يجب أن يبدأ الحقل :attribute بأحد القيم التالية: :values.',
    'string' => 'يجب أن يكون الحقل :attribute سلسلة محارف.',
    'timezone' => 'يجب أن يكون الحقل :attribute منطقة زمنية صالحة.',
    'unique' => 'قيمة الحقل :attribute مستخدمة بالفعل.',
    'uploaded' => 'فشل تحميل الحقل :attribute.',
    'uppercase' => 'يجب أن يكون الحقل :attribute بأحرف كبيرة.',
    'url' => 'يجب أن يكون الحقل :attribute عنوان URL صالحاً.',
    'ulid' => 'يجب أن يكون الحقل :attribute معرف ULID صالحاً.',
    'uuid' => 'يجب أن يكون الحقل :attribute معرف UUID صالحاً.',

    /*
    |--------------------------------------------------------------------------
    | أسطر لغة التحقق المخصصة
    |--------------------------------------------------------------------------
    |
    | يمكنك هنا تحديد رسائل تحقق مخصصة للسمات باستخدام
    | اصطلاح "attribute.rule" لتسمية الأسطر. وهذا يسمح
    | بتحديد سطر لغة مخصص بسرعة لقاعدة سمة معينة.
    |
    */

    'custom' => [
        'attribute-name' => [
            'rule-name' => 'رسالة مخصصة',
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | سمات التحقق المخصصة
    |--------------------------------------------------------------------------
    |
    | تستخدم أسطر اللغة التالية لاستبدال مكان السمة
    | بشيء أكثر ودية، مثل "عنوان البريد الإلكتروني" بدلاً من "email".
    | هذا يساعدنا ببساطة على جعل رسالتنا أكثر تعبيراً.
    |
    */

    'attributes' => [],

];
